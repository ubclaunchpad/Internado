import { getRepository } from "typeorm";
import * as validator from "validator";
import User from "../models/user";
import { TE, to } from "./Util";

export async function addUserToDB(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) {  TE("No email was entered"); }
  if (!userInfo.password) {  TE("No password was entered"); }

  // Create User
  let err;
  let user;

  // Make sure user does not exist
  [err, user] = await to(userRepository.findOne({ email: userInfo.email }));
  if (err) {  TE(err); }
  if (user) {  TE("User already exists"); }

  [err, user] = await to(userRepository.save(userRepository.create(userInfo)));
  if (err) {  TE(err); }

  return user;
}

export async function authUser(userInfo: any) {
  const userRepository = getRepository(User);

  // Validations
  if (!userInfo.email) {  TE("No email was entered"); }
  if (!userInfo.password) {  TE("No password was entered"); }
  if (!validator.isEmail(userInfo.email)) {  TE("Incorrect email format"); }

  // Login user
  let err;
  let user: any;
  let isPasswordValid;

  [err, user] = await to(userRepository.findOne({ email: userInfo.email }));
  if (err) { TE(err); }
  if (!user) { TE("User Does not exist"); }

  [err, isPasswordValid] = await to(user.validatePassword(userInfo.password));
  if (err) { TE(err); }
  if (!isPasswordValid) {  TE("Invalid Password"); }

  return user;
}
