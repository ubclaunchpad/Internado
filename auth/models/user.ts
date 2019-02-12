import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import jwtConfig from "../configurations/jwt.js";
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

  @PrimaryGeneratedColumn({ type: "bigint" })
  public id: number;

  @Column("varchar", { nullable: true, length: 256 })
  public first_name: string;

  @Column("varchar", { nullable: true, length: 256 })
  public last_name: string;

  @Column("varchar", { nullable: false, unique: true, length: 256 })
  public email: string;

  @Column("varchar", { nullable: false })
  public password: string;

  async validatePassword(plainTextPassword: string) {
    return bcrypt.compare(plainTextPassword, this.password + "");
  }
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      token: this.getJWT()
    };
  }
  getJWT() {
    let expirationTime = parseInt(jwtConfig.expiration, 10);
    return (
      "Bearer " +
      jwt.sign(
        {
          id: this.id
        },
        jwtConfig.encryption,
        {
          expiresIn: expirationTime
        }
      )
    );
  }
}
