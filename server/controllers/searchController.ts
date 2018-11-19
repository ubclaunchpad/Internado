import { Client } from "pg";
import Job from "../models/job";
import { Request, Response } from "express";
import config from "../configurations/app";
import {createConnection} from "typeorm";

const connectionString: string = config.dbConnectionString;
const defaultTake: number = 10;

interface SearchRequest {
    keywords: string;
    take: number;
    offset: number;
    latitude: number;
    longitude: number;
    sortByLocation: boolean;
    firstDateFilter: Date;
    lastDateFilter: Date;
}

export function searchJobs(req: Request, res: Response): void {

    let search: SearchRequest = getSearchRequest(req, res);
    if (search === null) { return; }

    let query: string = getQuery(search);

    // client.query(query)
    //     .then((result) => {
    //         res.send(result.rows);
    //     })
    //     .catch((err) => {
    //         res.status(500).send(`Failed to query database.\nError: ${err}`);
    //     });

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

    let sortByLocation: boolean = false;
    if (latitude || longitude) {
        sortByLocation = true;
    }

    if (sortByLocation && ((typeof latitude) !== "number" || (typeof longitude) !== "number" ||
        latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180)) {
        res.status(400).send("To sort by location, both latitude and longitude must be valid.");
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

    return {
        keywords,
        take,
        offset,
        latitude,
        longitude,
        sortByLocation,
        firstDateFilter,
        lastDateFilter
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
            j_start_date AS start_date
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

    return where;
}

function getOrderBy(search: SearchRequest) {
    if (search.sortByLocation) {
        return `ORDER BY 3956 * 2 *
		ASIN(SQRT( POWER(SIN((${search.latitude} - j_latitude) * pi()/180 / 2), 2) +
		COS(${search.latitude} * pi()/180) * COS(j_latitude * pi()/180) *
		POWER(SIN((${search.longitude} - j_longitude) * pi()/180 / 2), 2)))`;
    }

    return `ORDER BY ts_rank(p_search.document, to_tsquery('${search.keywords}')) DESC`;
}

function sanitizeKeywords(raw: string): string {
    let keywords: string = raw;
    keywords = keywords.trim();

    keywords = keywords.replace(/[^\w\s\-]/g, "");
    keywords = keywords.replace(/\&/g, "");
    keywords = keywords.replace(/\s+/g, " & ");

    return keywords;
}
