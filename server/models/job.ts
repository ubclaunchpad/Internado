import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export default class Job {

    @PrimaryGeneratedColumn({type: "bigint"})
    public id: number;

    @Column({ nullable: true })
    public jobTitle: string;

    @Column({ nullable: true, type: "text"})
    public link: string;

    @Column({ nullable: true, type: "text"})
    public description: string;

    @Column({ nullable: true })
    public city: string;

    @Column({ nullable: true })
    public country: string;

    @Column({ nullable: true, type: "double precision" })
    public latitude: number;

    @Column({ nullable: true, type: "double precision" })
    public longitude: number;

    @Column({ nullable: true })
    public companyName: string;

    @Column({ nullable: true, type: "date" })
    public startDate: Date;

    @Column({ nullable: true })
    public minSalary: number;
}
