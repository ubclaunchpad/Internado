import { getRepository } from "typeorm";
import User from "../models/user";

export async function addUserToDB(userInfo: any) {
  const userRepository = getRepository(User);
  const user = userRepository.create(userInfo);
  return userRepository.save(user);
}

export async function authUser(userInfo: any) {
  const userRepository = getRepository(User);
  let user = await userRepository.findOne({email: userInfo.email});
  let correct = await user.validatePassword(userInfo.password);
  if (correct) { return user; }
}
