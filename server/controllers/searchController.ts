import {Request, Response} from "express";
import {Connection, createConnection, getConnection, SelectQueryBuilder} from "typeorm";
import SearchRequest, {OrderBy} from "../models/searchRequest";
import Job from "../models/job";

const defaultTake: number = 10;

export async function searchJobs(req: Request, res: Response): Promise<void> {
    let search: SearchRequest = getSearchRequest(req, res);
    if (search === null) { return; }

    let connection: Connection = getConnection();

    try {
        let jobs: Job[] = await queryJobs(search, connection);

        res.status(200).send({result: jobs});
    } catch (err) {
        res.status(500).send(`Failed to query database.\nError: ${err}`);
    }
}

function getSearchRequest(req: Request, res: Response): SearchRequest {
    if (!((typeof req.body.keywords) === "string")) {
        res.status(400).send("The keywords property must be included and be a string.");
        return null;
    }

    let keywords: string = sanitizeKeywords(req.body.keywords);

    let take: number = req.body.take ? req.body.take : defaultTake;
    if ((typeof take) !== "number" || take !== Math.floor(take) || take < 1) {
        res.status(400).send("The take property must be a positive integer.");
        return null;
    }

    let offset: number = req.body.offset ? req.body.offset : 0;
    if ((typeof offset) !== "number" || offset !== Math.floor(offset) || offset < 0) {
        res.status(400).send("The offset property must be a non-negative integer.");
        return null;
    }

    let latitude: number = req.body.latitude;
    let longitude: number = req.body.longitude;
    let radius: number = req.body.radius;

    if (radius === undefined) {
        radius = null;
    } else if ((typeof radius !== "number") || (typeof latitude !== "number") || (typeof longitude !== "number") ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        res.status(400).send("If radius is defined radius, longitude and latitude must be valid.");
        return null;
    }

    let orderBy: OrderBy = req.body.orderBy;

    if (orderBy === OrderBy.Distance && ((typeof latitude) !== "number" || (typeof longitude) !== "number" ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)) {
        res.status(400).send("To order by distance, both latitude and longitude must be valid.");
        return null;
    }

    let firstDateFilter: Date;
    if (req.body.firstDateFilter === undefined) {
        firstDateFilter = null;
    } else if (!isNaN(Date.parse(req.body.firstDateFilter))) {
        firstDateFilter = new Date(req.body.firstDateFilter);
    } else {
        res.status(400).send("The firstDateFilter property must be a valid date.");
        return null;
    }

    let lastDateFilter: Date;
    if (req.body.lastDateFilter === undefined) {
        lastDateFilter = null;
    } else if (!isNaN(Date.parse(req.body.lastDateFilter))) {
        lastDateFilter = new Date(req.body.lastDateFilter);
    } else {
        res.status(400).send("The lastDateFilter property must be a valid date.");
        return null;
    }

    let minSalary: number = req.body.minSalary;
    if (minSalary === undefined) {
        minSalary = null;
    } else if ((typeof minSalary) !== "number") {
        res.status(400).send("The minSalary property must be a number.");
        return null;
    }

    return {
        keywords,
        take,
        offset,
        latitude,
        longitude,
        radius,
        firstDateFilter,
        lastDateFilter,
        minSalary,
        orderBy,
    };
}

async function queryJobs(search: SearchRequest, connection: Connection): Promise<any[]> {
    let innerQb: SelectQueryBuilder<Job> = await getInnerQueryBuilder(search, connection);

    let queryBuilder: SelectQueryBuilder<any> = await connection
        .createQueryBuilder()
        .select("job_id", "id")
        .addSelect("job_title", "title")
        .addSelect("job_link", "link")
        .addSelect("job_description", "description")
        .addSelect("job_link", "link")
        .addSelect("job_city", "city")
        .addSelect("job_country", "country")
        .addSelect("job_latitude", "latitude")
        .addSelect("job_longitude", "longitude")
        .addSelect("job_company_name", "company_name")
        .addSelect("job_start_date", "start_date")
        .addSelect("job_min_salary", "min_salary")
        .from("(" + innerQb.getQuery() + ")", "p_search")
        .setParameters(innerQb.getParameters());

    addWhere(search, queryBuilder);
    addOrderBy(search, queryBuilder);

    let jobs: any[] = await queryBuilder.getRawMany();

    return jobs;
}

async function getInnerQueryBuilder(search: SearchRequest, connection: Connection): Promise<SelectQueryBuilder<Job>> {
    let innerQueryBuilder: SelectQueryBuilder<Job> = await connection
        .getRepository(Job)
        .createQueryBuilder("job")
        .select("job")
        .addSelect(`setweight(to_tsvector(job.title), 'A') ||
                setweight(to_tsvector(job.description), 'B') ||
                setweight(to_tsvector(job.company_name), 'A')`,
            "job_document");

    if (search.longitude && search.latitude) {
        innerQueryBuilder.addSelect(
            "(point(:longitude, :latitude) <@> point(job.longitude, job.latitude)) * 1.609344",
            "job_distance")
            .setParameters({longitude: search.longitude, latitude: search.latitude});
    }

    return innerQueryBuilder;
}

function addWhere(search: SearchRequest, qb: SelectQueryBuilder<any>): void {
    qb.where("job_document @@ to_tsquery(:keywords)", {keywords: `'${search.keywords}'`});

    if (search.firstDateFilter) {
        let date: Date = search.firstDateFilter;
        let dateString: string = `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
        qb.andWhere("job_start_date >= :firstDate", {firstDate: dateString});
    }

    if (search.lastDateFilter) {
        let date: Date = search.lastDateFilter;
        let dateString: string = `'${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
        qb.andWhere("job_start_date <= :lastDate", {lastDate: dateString});
    }

    if (search.minSalary) {
        qb.andWhere("job_min_salary >= :minSalary", {minSalary: search.minSalary});
    }

    if (search.longitude && search.latitude && search.radius) {
        qb.andWhere("job_distance <= :radius", {radius: search.radius});
    }
}

function addOrderBy(search: SearchRequest, qb: SelectQueryBuilder<any>): void {
    switch (search.orderBy) {
        case OrderBy.Distance:
            qb.orderBy("job_distance");
            break;
        case OrderBy.Relevance:
        default:
            qb.orderBy("ts_rank(job_document, to_tsquery(:keywords))");
            break;
    }
}

function sanitizeKeywords(raw: string): string {
    let keywords: string = raw;
    keywords = keywords.trim();

    keywords = keywords.replace(/[^\w\s\-]/g, "");
    keywords = keywords.replace(/\&/g, "");
    keywords = keywords.replace(/\s+/g, " & ");

    return keywords;
}
