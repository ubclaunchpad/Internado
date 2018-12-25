require("dotenv").config();
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import appConfig from "./configurations/app";
import router from "./routes/v1";
import "reflect-metadata";
import {createConnection} from "typeorm";

const app: express.Application = express();

/*Configuration*/
app.use(morgan("dev")); // req logging
app.use(bodyParser.json()); // parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); // parsing form req formats
app.disable("etag");

/*Routes*/
router(app);

/*RunServer*/
app.listen(appConfig.port);
console.log("Server has successfully started on PORT: " + appConfig.port);

createConnection().catch((err) => console.error("Failed to create connection to PostgreSQL\n" + err));
