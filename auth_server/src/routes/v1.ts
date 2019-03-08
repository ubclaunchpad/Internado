import { Request, Response, Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser
} from "../controllers/userController";

export default function (app: Router, passport: any) {
  /********  Api details  **********/
  app.get("/api", function (req: Request, res: Response) {
    res.json({ message: "Internado", version: "v1.0.0" });
  });
  /********************************/

  // Login user
  app.post("/user/login", loginUser);
  app.options("/user/login", corsAllowMethods("POST"));

  // Signup user
  app.post("/user", createUser);
  app.options("/user", corsAllowMethods("POST"));

  // Retreive user profile
  app.get(
    "/user",
    passport.authenticate("jwt", {
      session: false
    }),
    getUser
  );
  app.options("/user", corsAllowMethods("GET"));

  // Update user profile
  app.put(
    "/user",
    passport.authenticate("jwt", {
      session: false
    }),
    updateUser
  );
  app.options("/user", corsAllowMethods("PUT"));

  // Delete user profile
  app.delete(
    "/user",
    passport.authenticate("jwt", {
      session: false
    }),
    deleteUser
  );
  app.options("/user", corsAllowMethods("DELETE"));
}

function corsAllowMethods(methods: string) {
  return (req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", methods);
    res.status(200).send({ message: "Success" });
  };
}
