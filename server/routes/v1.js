"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var searchController_1 = require("../controllers/searchController");
var mailingListController_1 = require("../controllers/mailingListController");
function default_1(app) {
    /********  Api details  **********/
    app.get("/api", function (req, res) {
        res.json({ message: "Internado", version: "v1.0.0" });
    });
    /********************************/
    app.get("/express_backend", function (req, res) {
        res.send({ express: "React client is connected to Express server" });
    });
    app.post("/search", searchController_1.searchJobs);
    app.options("/search", corsAllowMethods("POST"));
    app.post("/mailing_list", mailingListController_1.addToMailingList);
    app.delete("/mailing_list", mailingListController_1.deleteFromMailingList);
    app.options("/mailing_list", corsAllowMethods("POST,DELETE"));
}
exports.default = default_1;
function corsAllowMethods(methods) {
    return function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", methods);
        res.status(200).send({ message: "Success" });
    };
}
//# sourceMappingURL=v1.js.map