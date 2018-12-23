import {Request, Response} from "express";
import {Connection, getConnection} from "typeorm";
import MailingListEntry from "../models/mailingListEntry";
import Job from "../models/job";

export async function addToMailingList(req: Request, res: Response): Promise<void> {
    let connection: Connection = getConnection();
    let emailAddress: string = req.query.email;
    console.log(req.query.email);

    let listEntry: MailingListEntry = {email: emailAddress};
    let job = new Job();
    job.job_title = "Test job 01";

    try {
        await connection
            .createQueryBuilder()
            .insert()
            .into(MailingListEntry)
            .values([listEntry])
            .execute();
        // await query.execute();
        res.status(201).send({result: listEntry});
    } catch (err) {
        if (err.code === "23505") {
            res.status(400).send({error: "This email is already on the mailing list"});
        } else {
            res.status(500).send({error: err});
        }
    }
}
