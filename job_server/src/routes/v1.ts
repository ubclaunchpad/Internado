import { searchJobs } from "../controllers/searchController";
import { addToMailingList, deleteFromMailingList } from "../controllers/mailingListController";
import { getJob, deleteJob, postJob, postJobs } from "../controllers/jobController";
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
    app.options("/search", corsAllowMethods("POST"));

    app.post("/mailing_list", addToMailingList);
    app.delete("/mailing_list", deleteFromMailingList);
    app.options("/mailing_list", corsAllowMethods("POST,DELETE"));

    app.get("/job", getJob);
    app.delete("/job", deleteJob);
    app.post("/job", postJob);
    app.post("/jobs", postJobs);
    app.options("/job", corsAllowMethods("GET,POST,DELETE"));
}

function corsAllowMethods(methods: string) {
    return (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", methods);
        res.status(200).send({message: "Success"});
    };
}
