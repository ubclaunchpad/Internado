import { getRepository } from "typeorm";
import * as validator from "validator";
import User from "../models/user";
import { throwError, to } from "./Util";

export async function addUserToDB(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) {
    throwError("No email was entered");
  }
  if (!userInfo.password) {
    throwError("No password was entered");
  }

  if (!validator.isEmail(userInfo.email)) {
    throwError("Incorrect email format");
  }

  // Create User
  let err;
  let user;

  // Make sure user does not exist
  [err, user] = await to(userRepository.findOne({ email: userInfo.email }));

  if (err) {
    throwError(err);
  }
  if (user) {
    throwError("User already exists");
  }

  [err, user] = await to(userRepository.save(userRepository.create(userInfo)));

  if (err) {
    throwError(err);
  }
  return user;
}

export async function authUser(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) {
    throwError("No email was entered");
  }
  if (!userInfo.password) {
    throwError("No password was entered");
  }
  if (!validator.isEmail(userInfo.email)) {
    throwError("Incorrect email format");
  }

  // Login user
  let err;
  let user: any;
  let isPasswordValid;

  [err, user] = await to(userRepository.findOne({ email: userInfo.email }));

  if (err) {
    throwError(err);
  }
  if (!user) {
    throwError("User Does not exist");
  }

  [err, isPasswordValid] = await to(user.validatePassword(userInfo.password));

  if (err) {
    throwError(err);
  }
  if (!isPasswordValid) {
    throwError("Invalid Password");
  }

  return user;
}
