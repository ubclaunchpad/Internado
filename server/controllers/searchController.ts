import { Client } from "pg";
import Job from "../models/job";
import { Request, Response } from "express";
import config from "../configurations/app";

const connectionString = config.dbConnectionString;


export function searchJobs(req: Request, res: Response): void {
    const client: Client = new Client(connectionString);
    client.connect();

    if (!((typeof req.body.keywords) === "string")) {
        res.status(400).send("The keywords property must be included and be a string.");
        return;
    }

    let keywords: string = sanitizeKeywords(req.body.keywords);
    let query: string = getQuery(keywords);

    client.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            res.status(500).send(`Failed to query database.\nError: ${err}`);
        });
}

function getQuery(keywords: string): string {
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
        WHERE p_search.document @@ to_tsquery('${keywords}')
        ORDER BY ts_rank(p_search.document, to_tsquery('${keywords}')) DESC;`;
}

function sanitizeKeywords(raw: string): string {
    let keywords: string = raw;
    keywords = keywords.trim();

    keywords = keywords.replace(/[^\w\s]/g, "");
    keywords = keywords.replace(/\&/g, "");
    keywords = keywords.replace(/\s+/g, " & ");

    return keywords;
}
