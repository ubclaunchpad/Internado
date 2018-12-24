import {Request, Response} from "express";
import {Connection, getConnection} from "typeorm";
import MailingListEntry from "../models/mailingListEntry";

export async function addToMailingList(req: Request, res: Response): Promise<void> {
    let connection: Connection = getConnection();

    let email: string = req.query.email;
    email = sanitizeEmail(email);
    let listEntry: MailingListEntry = {email};

    try {
        await connection
            .createQueryBuilder()
            .insert()
            .into(MailingListEntry)
            .values([listEntry])
            .execute();
        res.status(201).send({result: listEntry});
    } catch (err) {
        if (err.code === "23505") {
            res.status(400).send({error: "This email is already on the mailing list"});
        } else {
            res.status(500).send({error: err});
        }
    }
}

export async function deleteFromMailingList(req: Request, res: Response): Promise<void> {
    let connection: Connection = getConnection();

    let email: string = req.query.email;
    email = sanitizeEmail(email);

    try {
        await connection
            .createQueryBuilder()
            .delete()
            .from(MailingListEntry)
            .where("email = :email", {email})
            .execute();
        res.status(200).send({result: `Removed ${email} from mailing list`});
    } catch (err) {
        res.status(500).send({error: err});
    }
}

function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
}
