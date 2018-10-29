import { searchJobs } from "../controllers/searchController";
import { Router, Request, Response } from "express";

export default function (app: Router) {

    /********  Api details  **********/
    app.get("/api", function (req: Request, res: Response) {
        res.json({message : "Internado" , version : "v1.0.0"});
    });
    /********************************/

    app.get("/express_backend", (req: Request, res: Response) => {
        res.send({express: "React client is connected to Express server"});
    });

    app.post("/search", searchJobs);

}
