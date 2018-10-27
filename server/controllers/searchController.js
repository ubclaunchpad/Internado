"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const app_1 = require("../configurations/app");
const connectionString = app_1.default.dbConnectionString;
function searchJobs(req, res) {
    const client = new pg_1.Client(connectionString);
    client.connect();
    if (!((typeof req.body.keywords) === "string")) {
        res.status(400).send("The keywords property must be included and be a string.");
        return;
    }
    let keywords = sanitizeKeywords(req.body.keywords);
    let query = getQuery(keywords);
    client.query(query)
        .then((result) => {
        res.send(result.rows);
    })
        .catch((err) => {
        res.status(500).send(`Failed to query database.\nError: ${err}`);
    });
}
exports.searchJobs = searchJobs;
function getQuery(keywords) {
    return `SELECT jid, j_title 
        FROM (SELECT job.id as jid, 
        job.job_title as j_title, 
        to_tsvector(job.job_title) || 
        to_tsvector(job.description) || 
        to_tsvector(job.company_name) as document 
        FROM job) p_search 
        WHERE p_search.document @@ to_tsquery('${keywords}');`;
}
function sanitizeKeywords(raw) {
    let keywords = raw;
    keywords = keywords.trim();
    keywords = keywords.replace(/\&/g, "");
    keywords = keywords.replace(/\s/g, " & ");
    return keywords;
}
//# sourceMappingURL=searchController.js.map