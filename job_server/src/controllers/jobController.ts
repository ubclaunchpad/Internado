import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Job from "../models/job";

function reqJobToJob(reqJob: any): Job {
    let job: Job = new Job();
    job.id = undefined;
    job = {...job, ...reqJob};
    return job;
}

export async function postJob(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");

    if (req.headers["content-type"] !== "application/json") {
        res.status(400).send({error: "Content type must be application/json"});
        return;
    }

    if (Array.isArray(req.body)) {
        res.status(400).send({error: "Request body must be an object"});
        return;
    }

    let job: Job = reqJobToJob(req.body);

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        await jobsRepository.insert(job);
        res.status(201).send({result: job});

    } catch (err) {
        if (err.code === "23505") {
            res.status(400).send({
                error: "This link is already in the database"
            })
        } else if (err.code === "23502") {
            res.status(400).send({
                error: `The ${err.column} property cannot be null`
            });
        } else {
            res.status(500).send({
                error: "Failed to insert jobs into database"
            });
        }
    }
}

export async function postJobs(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");

    if (req.headers["content-type"] !== "application/json") {
        res.status(400).send({error: "Content type must be application/json"});
        return;
    }

    if (!Array.isArray(req.body)) {
        res.status(400).send({error: "Request body must be an array of ZipRecruiter jobs"});
        return;
    }

    let jobs: Job[] = req.body.map(reqJobToJob);

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        await jobsRepository.insert(jobs);
        res.status(201).send({result: jobs});

    } catch (err) {
        if (err.code === "23505") {
            res.status(400).send({
                error: "One of the links is already in the database"
            })
        } if (err.code === "23502") {
            res.status(400).send({
                error: `The ${err.column} property cannot be null`
            });
        } else {
            res.status(500).send({
                error: "Failed to insert jobs into database"
            });
        }
    }
}

export async function deleteJob(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    if (typeof req.query.id !== "string") {
        res.status(400).send({error: "id query parameter must be included"});
        return;
    }

    let id: number = Number(req.query.id);

    if (isNaN(id)) {
        res.status(400).send({error: "Could not parse id as a number"});
        return;
    }

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        let job: Job = await jobsRepository.findOne(req.query.id);
        if (!job) {
            res.status(400).send({error: `Job id ${req.query.id} not found`});
            return;
        }

        await jobsRepository.remove(job);
        res.status(200).send({result: job});
    } catch (err) {
        res.status(500).send({
            error: "Failed to remove job from database"
        });
    }
}

export async function getJob(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    if (typeof req.query.id !== "string") {
        res.status(400).send({error: "id query parameter must be included"});
        return;
    }

    let id: number = Number(req.query.id);

    if (isNaN(id)) {
        res.status(400).send({error: "Could not parse id as a number"});
        return;
    }

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        let job: Job = await jobsRepository.findOne(req.query.id);
        if (!job) {
            res.status(400).send({error: `Job id ${req.query.id} not found`});
            return;
        }

        res.status(200).send({result: job});
    } catch (err) {
        res.status(500).send({
            error: "Failed to get job from database"
        });
    }
}
