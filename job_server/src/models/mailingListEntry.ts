import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity()
export default class MailingListEntry {
    @PrimaryColumn({length: 256})
    public email: string;
}
