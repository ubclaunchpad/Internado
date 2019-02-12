import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/user";
import { addUserToDB, authUser } from "../services/AuthService";
import { hashPassword, ReE, ReS, to } from "../services/Util";

export async function loginUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  const body = req.body;
  let err;
  let user: any;

  [err, user] = await to(authUser(body));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, { token: user.getJWT(), user: user.toJSON() }, 200);
}

export async function createUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  const body = req.body;
  let err;
  let user: any;

  if (!body.password) {  return ReE(res, "No password was entered", 422); }
  // Hash password before saving to db
  body.password = await hashPassword(body.password);

  [err, user] = await to(addUserToDB(body));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, {message: "Successfully created new user", user: user.toJSON(), token: user.getJWT()}, 200);
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  const userRepository = await getRepository(User);

  let err;
  let user;

  [err, user] = await to(userRepository.delete(req.user.id));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, {message: "Successfully deleted user"}, 200);
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  const userRepository = await getRepository(User);

  const body = req.body;
  const user = req.user;
  let err;
  let newUser;

  // TODO : Add more Validations
  if (!body) { ReE(res, "Nothing to update", 422); }

  if (body.password) { // A password change is requested , need to rehash
    body.password = await hashPassword(body.password);
  }

  [err, newUser] = await to(userRepository.save(userRepository.merge(user, body)));
  if (err) {
    return ReE(res, err, 422);
  }
  return ReS(res, {message: "Successfully updated user"}, 200);
}

export async function getUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  return ReS(res, { user: req.user.toJSON() }, 200);
}
