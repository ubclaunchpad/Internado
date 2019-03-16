import { Request, Response } from "express";
import { getRepository, Repository } from "typeorm";
import Job from "../models/job";

function zipJobToJob(zipJob: any): Job {
    let job: Job = new Job();
    job.id = undefined;
    job.job_title = zipJob.name;
    job.link = zipJob.url;
    job.description = zipJob.snippet;
    job.city = zipJob.city;
    job.state = zipJob.state;
    job.country = zipJob.country;
    job.company_name = zipJob.hiring_company.name;
    job.salary_min = zipJob.salary_min_annual;

    return job;
}

export async function postJob(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    let job: Job = zipJobToJob(req.body);

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        await jobsRepository.insert(job);
        res.status(201).send({result: job});

    } catch (err) {
        res.status(500).send({
            error: "Failed to insert jobs into database"
        });
    }
}

export async function postJobs(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    if (!Array.isArray(req.body)) {
        res.status(400).send({error: "Request body must be an array of ZipRecruiter jobs"});
        return;
    }

    let jobs: Job[] = req.body.map(zipJobToJob);

    try {
        let jobsRepository: Repository<Job> = getRepository(Job);
        await jobsRepository.insert(jobs);
        res.status(201).send({result: jobs});

    } catch (err) {
        res.status(500).send({
            error: "Failed to insert jobs into database"
        });
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
        if (job === null) {
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
