import { Request, Response } from "express";
import { getRepository } from "typeorm";
import User from "../models/user";
import { addUserToDB, authUser } from "../services/AuthService";
import { hashPassword, resOnError, resOnSuccess, to } from "../services/Util";

export async function loginUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  const body = req.body;
  let err;
  let user: any;

  [err, user] = await to(authUser(body));
  if (err) {
    return resOnError(res, err, 422);
  }
  return resOnSuccess(
    res,
    {
      token: user.getJWT(),
      user: user.toJSON()
    },
    200
  );
}

export async function createUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");

  const body = req.body;
  let err;
  let user: User;

  if (!body.password) {
    return resOnError(res, "No password was entered", 422);
  }
  // Hash password before saving to db
  body.password = await hashPassword(body.password);

  [err, user] = await to(addUserToDB(body));
  if (err) {
    return resOnError(res, err, 422);
  }
  return resOnSuccess(
    res,
    {
      message: "Successfully created new user",
      user: user.toJSON(),
      token: user.getJWT()
    },
    201
  );
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  const userRepository = await getRepository(User);

  let err;
  let user;

  [err, user] = await to(userRepository.delete(req.user.id));
  if (err) {
    return resOnError(res, err, 422);
  }
  return resOnSuccess(
    res,
    {
      message: "Successfully deleted user"
    },
    202
  );
}

export async function updateUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  const userRepository = await getRepository(User);

  const body = req.body;
  const user = req.user;
  let err;
  let newUser;

  // TODO : Add more Validations
  if (!body) {
    resOnError(res, "Nothing to update", 400);
  }

  if (body.password) {
    // A password change is requested , need to rehash
    body.password = await hashPassword(body.password);
  }

  [err, newUser] = await to(
    userRepository.save(userRepository.merge(user, body))
  );

  if (err) {
    return resOnError(res, err, 422);
  }
  return resOnSuccess(
    res,
    {
      message: "Successfully updated user"
    },
    200
  );
}

export async function getUser(req: Request, res: Response): Promise<void> {
  res.setHeader("Content-Type", "application/json");
  return resOnSuccess(
    res,
    {
      user: req.user.toJSON()
    },
    200
  );
}
