import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class User {

    // Default constructor is used to generate and iterate through the property keys.
    constructor() {
        this.id = null;
        this.first_name = null;
        this.last_name = null;
        this.email = null;
        this.password = null;
    }

    @PrimaryGeneratedColumn({type: "bigint"})
    public id: number;

    @Column({ nullable: true, length: 256})
    public first_name: string;

    @Column({ nullable: true, length: 256})
    public last_name: string;

    @Column({ nullable: true, length: 256})
    public email: string;

    @Column({ nullable: true, type: "text"})
    public password: string;
}
