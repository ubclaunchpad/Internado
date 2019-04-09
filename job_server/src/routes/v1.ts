import { searchJobs } from "../controllers/searchController";
import { addToMailingList, deleteFromMailingList } from "../controllers/mailingListController";
import { getJob, deleteJob, postJob, postJobs } from "../controllers/jobController";
import { Router, Request, Response } from "express";

export default function (app: Router) {

    /********  Api details  **********/
    app.get("/job/api", function (req: Request, res: Response) {
        res.json({message : "Internado" , version : "v1.0.0"});
    });
    /********************************/

    app.get("/job/express_backend", (req: Request, res: Response) => {
        res.send({express: "React client is connected to Express server"});
    });

    app.post("/job/search", searchJobs);
    app.options("/job/search", corsAllowMethods("POST"));

    app.post("/job/mailing_list", addToMailingList);
    app.delete("/job/mailing_list", deleteFromMailingList);
    app.options("/job/mailing_list", corsAllowMethods("POST,DELETE"));

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
