import * as searchController from "../controllers/searchController";
import { Router, Request, Response } from "express";
import * as passportJWT from "passport-jwt";
import * as passport from "passport";
import * as userController from "./../controllers/userController";

export default function (app: Router) {

    /********  Api details  **********/
    app.get("/api", function (req: Request, res: Response) {
        res.json({message : "Internado" , version : "v1.0.0"});
    });
    /********************************/

    app.get("/express_backend", (req: Request, res: Response) => {
        res.send({express: "React client is connected to Express server"});
    });

    app.post("/search", searchController.searchJobs);

    /* USER ROUTES */
    /********  Login **************/
    app.post("/api/user/login", userController.login);
    /************************************/

    /************ create user ***************/ // C
    app.post("/api/user", userController.create);
    /************************************/

    /********  get user **************/ // R
    app.get("/api/user", passport.authenticate("jwt", {
        session: false
    }), userController.get);
    /************************************/

    /********  update user **************/ // U
    app.put("/api/user", passport.authenticate("jwt", {
        session: false
    }), userController.update);
    /************************************/

    /********  remove user **************/ // D
    app.delete("/api/user", passport.authenticate("jwt", {
        session: false
    }), userController.remove);
    /************************************/
}
