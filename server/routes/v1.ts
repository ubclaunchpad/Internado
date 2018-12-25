import { searchJobs } from "../controllers/searchController";
import { addToMailingList, deleteFromMailingList } from "../controllers/mailingListController";
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
  
    app.post("/mailing_list", addToMailingList);
    app.delete("/mailing_list", deleteFromMailingList);
  
    app.options("/search", (req: Request, res: Response) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "POST");
        res.status(200).send({message: "Success"});
    });
}
