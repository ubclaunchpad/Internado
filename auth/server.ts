require("dotenv").config();
import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import appConfig from "./configurations/app";
import router from "./routes/v1";
import "reflect-metadata";
import { createConnection } from "typeorm";
import * as passport from "passport";

const app: express.Application = express();

/*Configuration*/
app.use(morgan("dev")); // req logging
app.use(bodyParser.json()); // parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); // parsing form req formats
app.disable("etag");
require("./middleware/passport")(passport);
app.use(passport.initialize());

/*Routes*/
router(app, passport);

/*RunServer*/
app.listen(appConfig.port, () => {
  const internado =
    "  _____       _                            _       " +
    "\n" +
    " |_   _|     | |                          | |      " +
    "\n" +
    "   | |  _ __ | |_ ___ _ __ _ __   __ _  __| | ___  " +
    "\n" +
    "   | | | '_ \\| __/ _ \\ '__| '_ \\ / _` |/ _` |/ _ \\ " +
    "\n" +
    "  _| |_| | | | ||  __/ |  | | | | (_| | (_| | (_) |" +
    "\n" +
    " |_____|_| |_|\\__\\___|_|  |_| |_|\\__,_|\\__,_|\\___/ " +
    "\n";
  console.log(internado);
  console.log(
    "Authentication Server has successfully started on PORT: " + appConfig.port
  );
});

/*Establish Connection with DB*/
createConnection()
  .then(() => console.log("Succesfully connected to PostgreSQL\n"))
  .catch((err) =>
    console.error("Failed to create connection to PostgreSQL\n" + err)
  );
