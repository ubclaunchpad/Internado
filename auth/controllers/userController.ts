import { Request, Response } from "express";
import User from "../models/user";
import { getRepository } from "typeorm";
import { addUserToDB, authUser } from "../services/AuthService";
import * as bcrypt from "bcrypt";

async function hashPassword(password: string, saltRounds: number = 10) {
  return bcrypt.hash(password, saltRounds);
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  const test = { email: "test@hotmail.com", password: "1234" };

  const user = await authUser(test);
  res.json(user);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  const test = { email: "test@hotmail.com", password: "1234" };
  test.password = await hashPassword(test.password);

  await addUserToDB(test);
  res.json("Done");
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  const test = { email: "test@hotmail.com" };

  const userRepository = await getRepository(User);
  await userRepository.delete(test);
  res.json("Done");
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  const test = { email: "test2@hotmail.com" };

  const userRepository = await getRepository(User);
  const user = req.user;
  await userRepository.merge(user, test);
  await userRepository.save(user);
  res.json(user);
}

export async function getUser(req: Request, res: Response): Promise<void> {
  res.json(req.user);
}
