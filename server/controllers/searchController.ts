import {Client} from "pg";
import {Request, Response} from "express";
import config from "../configurations/app";
import {createConnection} from "typeorm";
import SearchRequest, {OrderBy} from "../models/searchRequest";
import Job from "../models/job";

const connectionString: string = config.dbConnectionString;
const defaultTake: number = 10;

export function searchJobs(req: Request, res: Response): void {
    let search: SearchRequest = getSearchRequest(req, res);
    if (search === null) { return; }

    let query: string = getQuery(search);

    createConnection().then(async (connection) => {
        let jobs: Job[] = await connection
            .getRepository(Job)
            .createQueryBuilder("job")
            .select(`setweight(to_tsvector(job.job_title), 'A') ||
                setweight(to_tsvector(job.description), 'B') ||
                setweight(to_tsvector(job.company_name), 'A')`,
                "document")
            .where("document @@ to_tsquery('intern')")
            .getMany();

        res.status(200).send({result: jobs});
    }).catch((err) => {
        res.status(500).send(`Failed to query database.\nError: ${err}`);
    });
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

function getQuery(search: SearchRequest): string {
    return `SELECT jid AS id, j_title AS job_title,
            j_description AS description,
            j_company_name AS company_name,
            j_link AS link,
            j_city AS city,
            j_country AS country,
            j_latitude AS latitude,
            j_longitude AS longitude,
            j_start_date AS start_date,
            j_salary AS salary
            FROM (SELECT job.id as jid,
            job.job_title as j_title,
            job.description as j_description,
            job.company_name AS j_company_name,
            job.link AS j_link,
            job.city AS j_city,
            job.country AS j_country,
            job.latitude AS j_latitude,
            job.longitude AS j_longitude,
            job.start_date AS j_start_date,
            job.salary AS j_salary,
            ${getDistanceField(search)}
            setweight(to_tsvector(job.job_title), 'A') ||
            setweight(to_tsvector(job.description), 'B') ||
            setweight(to_tsvector(job.company_name), 'A') as document
            FROM job) p_search
            ${getWhere(search)}
            ${getOrderBy(search)}
            LIMIT ${search.take} OFFSET ${search.offset};`;
}

function getWhere(search: SearchRequest) {
    let where: string = `WHERE p_search.document @@ to_tsquery('${search.keywords}')`;

    if (search.firstDateFilter) {
        let date = search.firstDateFilter;
        where += ` AND j_start_date >= '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
    }

    if (search.lastDateFilter) {
        let date = search.lastDateFilter;
        where += ` AND j_start_date <= '${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}'`;
    }

    if (search.minSalary) {
        where += ` AND j_salary >= ${search.minSalary}`;
    }

    if (search.radius) {
        where += ` AND j_distance <= ${search.radius}`;
    }

    return where;
}

function getOrderBy(search: SearchRequest) {
    if (search.orderBy === OrderBy.Distance) {
        return `ORDER BY j_distance`;
    }

    return `ORDER BY ts_rank(p_search.document, to_tsquery('${search.keywords}')) DESC`;
}

function getDistanceField(search: SearchRequest) {
    if (!search.longitude || !search.latitude) {
        return "";
    }
    return `point(${search.longitude}, ${search.latitude}) <@> point(job.longitude, job.latitude) AS j_distance, `;
}

function sanitizeKeywords(raw: string): string {
    let keywords: string = raw;
    keywords = keywords.trim();

    keywords = keywords.replace(/[^\w\s\-]/g, "");
    keywords = keywords.replace(/\&/g, "");
    keywords = keywords.replace(/\s+/g, " & ");

    return keywords;
}
