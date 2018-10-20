import { Client } from "pg";
import Job from "../models/job";
import { Request, Response } from "express";

const connectionString =
    "postgres://internado@postgres-develop:UBClaunchpad!" +
    "@postgres-develop.postgres.database.azure.com:5432/internado?ssl=false";

export function searchJobs(req: Request, res: Response): void {
    const client: Client = new Client(connectionString);
    client.connect();

    if (!((typeof req.body.keywords) === "string")) {
        res.status(400).send("The keywords property must be included and be a string.");
        return;
    }

    let keywords: string = formatKeywords(req.body.keywords);
    let query: string = getQuery(keywords);

    client.query(query)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            res.status(500).send("Failed to query database.\nError: " + err);
        });
}

function getQuery(keywords: string): string {
    return "SELECT jid, j_title " +
        "FROM (SELECT job.id as jid, " +
        "job.job_title as j_title, " +
        "to_tsvector(job.job_title) || " +
        "to_tsvector(job.description) || " +
        "to_tsvector(job.company_name) as document " +
        "FROM job) p_search " +
        "WHERE p_search.document @@ to_tsquery('" + keywords + "');";
}

function formatKeywords(raw: string): string {
    let keywords: string = raw;
    keywords = keywords.trim();

    keywords = keywords.replace(/\&/g, "")
    keywords = keywords.replace(/\s/g, " & ")

    return keywords;
}
