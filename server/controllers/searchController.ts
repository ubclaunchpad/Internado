import { Request, Response } from "express";
import { Connection, getConnection, SelectQueryBuilder } from "typeorm";
import SearchRequest, { OrderBy } from "../models/searchRequest";
import Job from "../models/job";

const DEFAULT_TAKE: number = 10;

export async function searchJobs(req: Request, res: Response): Promise<void> {
    const search: SearchRequest = getSearchRequest(req, res);
    if (!search) {
        return;
    }

    const connection: Connection = getConnection();

    try {
        const jobs: Job[] = await queryJobs(search, connection);

        res.header("Access-Control-Allow-Origin", "*");
        res.status(200).send({ result: jobs });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

function getSearchRequest(req: Request, res: Response): SearchRequest {
    if (!(typeof req.body.keywords === "string")) {
        res.status(400).send({
            error: "The keywords property must be included and be a string."
        });
        return null;
    }

    const keywords: string = sanitizeKeywords(req.body.keywords);

    if (keywords === "") {
        res.status(400).send({
            error: "The keywords property must include search terms."
        });
        return null;
    }

    const take: number = req.body.take || DEFAULT_TAKE;
    if (typeof take !== "number" || take !== Math.floor(take) || take < 1) {
        res.status(400).send({
            error: "The take property must be a positive integer."
        });
        return null;
    }

    const offset: number = req.body.offset || 0;
    if (
        typeof offset !== "number" ||
        offset !== Math.floor(offset) ||
        offset < 0
    ) {
        res.status(400).send({
            error: "The offset property must be a non-negative integer."
        });
        return null;
    }

    const latitude: number = req.body.latitude;
    const longitude: number = req.body.longitude;
    const radius: number = req.body.radius || null;

    if (
        radius &&
        (typeof radius !== "number" ||
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180)
    ) {
        res.status(400).send({
            error: "If radius is defined, longitude and latitude must be valid."
        });
        return null;
    }

    const orderBy: OrderBy = req.body.orderBy;

    if (
        orderBy === OrderBy.Distance &&
        (typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180)
    ) {
        res.status(400).send({
            error:
                "To order by distance, both latitude and longitude must be valid."
        });
        return null;
    }

    let firstDateFilter: Date;
    if (!req.body.firstDateFilter) {
        firstDateFilter = null;
    } else if (!isNaN(Date.parse(req.body.firstDateFilter))) {
        firstDateFilter = new Date(req.body.firstDateFilter);
    } else {
        res.status(400).send({
            error: "The firstDateFilter property must be a valid date."
        });
        return null;
    }

    let lastDateFilter: Date;
    if (!req.body.lastDateFilter) {
        lastDateFilter = null;
    } else if (!isNaN(Date.parse(req.body.lastDateFilter))) {
        lastDateFilter = new Date(req.body.lastDateFilter);
    } else {
        res.status(400).send({
            error: "The lastDateFilter property must be a valid date."
        });
        return null;
    }

    const salaryMin: number = req.body.salaryMin || null;
    if (salaryMin && typeof salaryMin !== "number") {
        res.status(400).send({
            error: "The salaryMin property must be a number."
        });
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
        salaryMin,
        orderBy
    };
}

async function queryJobs(
    search: SearchRequest,
    connection: Connection
): Promise<any[]> {
    const queryBuilder: SelectQueryBuilder<
        any
    > = await connection.createQueryBuilder();
    addSelects(queryBuilder);

    const innerQb: SelectQueryBuilder<Job> = await getInnerQueryBuilder(
        search,
        connection
    );
    queryBuilder
        .from("(" + innerQb.getQuery() + ")", "p_search")
        .setParameters(innerQb.getParameters());

    addWhere(search, queryBuilder);
    addOrderBy(search, queryBuilder);

    return queryBuilder.getRawMany();
}

async function getInnerQueryBuilder(
    search: SearchRequest,
    connection: Connection
): Promise<SelectQueryBuilder<Job>> {
    const innerQueryBuilder: SelectQueryBuilder<Job> = await connection
        .getRepository(Job)
        .createQueryBuilder("job")
        .select("job")
        .addSelect(
            `setweight(to_tsvector(job.job_title), 'A') ||
                setweight(to_tsvector(job.description), 'B') ||
                setweight(to_tsvector(job.company_name), 'A')`,
            "job_document"
        );

    if (search.longitude && search.latitude) {
        innerQueryBuilder
            .addSelect(
                "(point(:longitude, :latitude) <@> point(job.longitude, job.latitude)) * 1.609344",
                "job_distance"
            )
            .setParameters({
                longitude: search.longitude,
                latitude: search.latitude
            });
    }

    return innerQueryBuilder;
}

function addSelects(qb: SelectQueryBuilder<any>) {
    const PREFIX: string = "job_";

    Object.keys(new Job()).forEach((key, index) => {
        if (index === 0) {
            qb.select(PREFIX + key, key);
        } else {
            qb.addSelect(PREFIX + key, key);
        }
    });
}

function addWhere(search: SearchRequest, qb: SelectQueryBuilder<any>): void {
    qb.where("job_document @@ to_tsquery(:keywords)", {
        keywords: `'${search.keywords}'`
    });

    if (search.firstDateFilter) {
        const date: Date = search.firstDateFilter;
        const dateString: string = `'${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}'`;
        qb.andWhere("job_start_date >= :firstDate", { firstDate: dateString });
    }

    if (search.lastDateFilter) {
        const date: Date = search.lastDateFilter;
        const dateString: string = `'${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()}'`;
        qb.andWhere("job_start_date <= :lastDate", { lastDate: dateString });
    }

    if (search.salaryMin) {
        qb.andWhere("job_salary_min >= :salaryMin", {
            salaryMin: search.salaryMin
        });
    }

    if (search.longitude && search.latitude && search.radius) {
        qb.andWhere("job_distance <= :radius", { radius: search.radius });
    }
}

function addOrderBy(search: SearchRequest, qb: SelectQueryBuilder<any>): void {
    switch (search.orderBy) {
        case OrderBy.Distance:
            qb.orderBy("job_distance");
            break;
        default:
            qb.orderBy("ts_rank(job_document, to_tsquery(:keywords))");
            break;
    }
}

function sanitizeKeywords(raw: string): string {
    return raw
        .trim()
        .replace(/[^\w\s\-]/g, "")
        .replace(/\&/g, "")
        .replace(/\s+/g, " & ");
}
