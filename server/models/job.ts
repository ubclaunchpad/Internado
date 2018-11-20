import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Job {

    @PrimaryGeneratedColumn({type: "bigint"})
    public id: number;

    @Column({ nullable: true, length: 256})
    public title: string;

    @Column({ nullable: true, type: "text"})
    public link: string;

    @Column({ nullable: true, type: "text"})
    public description: string;

    @Column({ nullable: true, length: 256})
    public city: string;

    @Column({ nullable: true, length: 256})
    public country: string;

    @Column({ nullable: true, type: "double precision" })
    public latitude: number;

    @Column({ nullable: true, type: "double precision" })
    public longitude: number;

    @Column({ nullable: true, length: 256})
    public company_name: string;

    @Column({ nullable: true, type: "date" })
    public start_date: Date;

    @Column({ nullable: true, type: "integer"})
    public min_salary: number;
}
