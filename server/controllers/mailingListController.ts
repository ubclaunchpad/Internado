import { Request, Response } from "express";
import { Connection, getConnection } from "typeorm";
import MailingListEntry from "../models/mailingListEntry";

export async function addToMailingList(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    const connection: Connection = getConnection();

    const email: string = sanitizeEmail(req.query.email);

    if (!isValidEmailAddress(email)) {
        res.status(400).send({ error: "Email address isn't valid" });
        return;
    }

    const listEntry: MailingListEntry = { email };

    try {
        await connection
            .createQueryBuilder()
            .insert()
            .into(MailingListEntry)
            .values([listEntry])
            .execute();

        res.status(201).send({ result: listEntry });
    } catch (err) {
        if (err.code === "23505") {
            res.status(400).send({
                error: "This email is already on the mailing list"
            });
        } else {
            res.status(500).send({ error: err });
        }
    }
}

export async function deleteFromMailingList(
    req: Request,
    res: Response
): Promise<void> {
    res.header("Access-Control-Allow-Origin", "*");
    const connection: Connection = getConnection();

    const email: string = sanitizeEmail(req.query.email);

    try {
        await connection
            .createQueryBuilder()
            .delete()
            .from(MailingListEntry)
            .where("email = :email", { email })
            .execute();

        res.status(200).send({ result: `Removed ${email} from mailing list` });
    } catch (err) {
        res.status(500).send({ error: err });
    }
}

function sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
}

function isValidEmailAddress(email: string): boolean {
    // Regex taken from https://emailregex.com/
    const regex = new RegExp(
        '^(([^<>()\\[\\]\\.,;:\\s@\\"]+' +
            '(\\.[^<>()\\[\\]\\.,;:\\s@\\"]+)*)|(\\".+\\"))' +
            '@(([^<>()[\\]\\.,;:\\s@\\"]+\\.)+' +
            '[^<>()[\\]\\.,;:\\s@\\"]{2,})$',
        "gi"
    );
    const matches = email.match(regex);
    return matches !== null && matches.length === 1;
}
