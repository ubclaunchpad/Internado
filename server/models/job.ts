import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Job {

    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ nullable: true })
    jobTitle: string;

    @Column({ nullable: true, type: "text"})
    link: string;

    @Column({ nullable: true, type: "text"})
    description: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    country: string;

    @Column({ nullable: true, type: "double precision" })
    latitude: number;

    @Column({ nullable: true, type: "double precision" })
    longitude: number;

    @Column({ nullable: true })
    companyName: string;

    @Column({ nullable: true, type: "date" })
    startDate: Date;

    @Column({ nullable: true })
    minSalary: number;
}