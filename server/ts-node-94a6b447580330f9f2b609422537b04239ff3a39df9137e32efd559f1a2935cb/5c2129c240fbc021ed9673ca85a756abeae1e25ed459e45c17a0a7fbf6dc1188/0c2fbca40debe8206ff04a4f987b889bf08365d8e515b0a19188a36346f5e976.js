"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var app_1 = require("./configurations/app");
var v1_1 = require("./routes/v1");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var app = express();
/*Configuration*/
app.use(morgan("dev")); // req logging
app.use(bodyParser.json()); // parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); // parsing form req formats
app.disable("etag");
/*Routes*/
v1_1.default(app);
/*RunServer*/
app.listen(app_1.default.port);
console.log("Server has successfully started on PORT: " + app_1.default.port);
typeorm_1.createConnection().catch(function (err) { return console.error("Failed to create connection to PostgreSQL\n" + err); });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3Vzci9zcmMvYXBwL2ludGVybmFkby1zZXJ2ZXIvc2VydmVyLnRzIiwic291cmNlcyI6WyIvdXNyL3NyYy9hcHAvaW50ZXJuYWRvLXNlcnZlci9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsaUNBQW1DO0FBQ25DLCtCQUFpQztBQUNqQyx3Q0FBMEM7QUFDMUMsNENBQTZDO0FBQzdDLGtDQUFpQztBQUNqQyw0QkFBMEI7QUFDMUIsbUNBQXlDO0FBRXpDLElBQU0sR0FBRyxHQUF3QixPQUFPLEVBQUUsQ0FBQztBQUUzQyxpQkFBaUI7QUFDakIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWM7QUFDdEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtBQUN2RCxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO0FBQy9FLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFcEIsVUFBVTtBQUNWLFlBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVaLGFBQWE7QUFDYixHQUFHLENBQUMsTUFBTSxDQUFDLGFBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxHQUFHLGFBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUUxRSwwQkFBZ0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsNkNBQTZDLEdBQUcsR0FBRyxDQUFDLEVBQWxFLENBQWtFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbInJlcXVpcmUoXCJkb3RlbnZcIikuY29uZmlnKCk7XG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgKiBhcyBtb3JnYW4gZnJvbSBcIm1vcmdhblwiO1xuaW1wb3J0ICogYXMgYm9keVBhcnNlciBmcm9tIFwiYm9keS1wYXJzZXJcIjtcbmltcG9ydCBhcHBDb25maWcgZnJvbSBcIi4vY29uZmlndXJhdGlvbnMvYXBwXCI7XG5pbXBvcnQgcm91dGVyIGZyb20gXCIuL3JvdXRlcy92MVwiO1xuaW1wb3J0IFwicmVmbGVjdC1tZXRhZGF0YVwiO1xuaW1wb3J0IHtjcmVhdGVDb25uZWN0aW9ufSBmcm9tIFwidHlwZW9ybVwiO1xuXG5jb25zdCBhcHA6IGV4cHJlc3MuQXBwbGljYXRpb24gPSBleHByZXNzKCk7XG5cbi8qQ29uZmlndXJhdGlvbiovXG5hcHAudXNlKG1vcmdhbihcImRldlwiKSk7IC8vIHJlcSBsb2dnaW5nXG5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTsgLy8gcGFyc2luZyBqc29uIHJlcSBmb3JtYXRzXG5hcHAudXNlKGJvZHlQYXJzZXIudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiB0cnVlIH0pKTsgLy8gcGFyc2luZyBmb3JtIHJlcSBmb3JtYXRzXG5hcHAuZGlzYWJsZShcImV0YWdcIik7XG5cbi8qUm91dGVzKi9cbnJvdXRlcihhcHApO1xuXG4vKlJ1blNlcnZlciovXG5hcHAubGlzdGVuKGFwcENvbmZpZy5wb3J0KTtcbmNvbnNvbGUubG9nKFwiU2VydmVyIGhhcyBzdWNjZXNzZnVsbHkgc3RhcnRlZCBvbiBQT1JUOiBcIiArIGFwcENvbmZpZy5wb3J0KTtcblxuY3JlYXRlQ29ubmVjdGlvbigpLmNhdGNoKChlcnIpID0+IGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gY3JlYXRlIGNvbm5lY3Rpb24gdG8gUG9zdGdyZVNRTFxcblwiICsgZXJyKSk7XG4iXX0=