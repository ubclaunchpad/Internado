import { Client } from "pg";
import Job from "../models/job";
import { Request, Response } from "express";

const connectionString =
    "postgres://internado@postgres-develop:UBClaunchpad!" +
    "@postgres-develop.postgres.database.azure.com:5432/internado?ssl=false";

export function searchJobs(req: Request, res: Response): void {
    const client: Client = new Client(connectionString);
    client.connect();

    client.query("SELECT * FROM job ORDER BY latitude")
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            res.status = 500;
            res.send("Failed to query database.\nError: " + err);
        });
}
