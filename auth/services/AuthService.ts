import {to} from "./Util";
import { getRepository } from "typeorm";
import * as validator from "validator";
import User from "../models/user";

export async function addUserToDB(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) { throw Error; }
  if (!userInfo.password) { throw Error; }

  // Create User
  let err;
  let user;

  [err, user] = await to(userRepository.save(userRepository.create(userInfo)));
  if (err) { throw Error; }

  return user;
}

export async function authUser(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) { throw Error; }
  if (!userInfo.password) { throw Error; }
  if (!validator.isEmail(userInfo.email)) { throw Error; }

  // Login user
  let err;
  let user: any;
  let isPasswordValid;

  [err, user] = await to(userRepository.findOne({ email: userInfo.email }));
  if (err) { throw Error; }
  if (!user) { throw Error; }

  [err, isPasswordValid] = await to(user.validatePassword(userInfo.password));
  if (err) { throw Error; }
  if (!isPasswordValid) { throw Error; }

  return user;
}
