"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var searchRequest_1 = require("../models/searchRequest");
var job_1 = require("../models/job");
var DEFAULT_TAKE = 10;
function searchJobs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var search, connection, jobs, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    search = getSearchRequest(req, res);
                    if (!search) {
                        return [2 /*return*/];
                    }
                    connection = typeorm_1.getConnection();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, queryJobs(search, connection)];
                case 2:
                    jobs = _a.sent();
                    res.header("Access-Control-Allow-Origin", "*");
                    res.status(200).send({ result: jobs });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    res.status(500).send({ error: err_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.searchJobs = searchJobs;
function getSearchRequest(req, res) {
    if (!(typeof req.body.keywords === "string")) {
        res.status(400).send({
            error: "The keywords property must be included and be a string."
        });
        return null;
    }
    var keywords = sanitizeKeywords(req.body.keywords);
    if (keywords === "") {
        res.status(400).send({
            error: "The keywords property must include search terms."
        });
        return null;
    }
    var take = req.body.take || DEFAULT_TAKE;
    if (typeof take !== "number" || take !== Math.floor(take) || take < 1) {
        res.status(400).send({
            error: "The take property must be a positive integer."
        });
        return null;
    }
    var offset = req.body.offset || 0;
    if (typeof offset !== "number" ||
        offset !== Math.floor(offset) ||
        offset < 0) {
        res.status(400).send({
            error: "The offset property must be a non-negative integer."
        });
        return null;
    }
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var radius = req.body.radius || null;
    if (radius &&
        (typeof radius !== "number" ||
            typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180)) {
        res.status(400).send({
            error: "If radius is defined, longitude and latitude must be valid."
        });
        return null;
    }
    var orderBy = req.body.orderBy;
    if (orderBy === searchRequest_1.OrderBy.Distance &&
        (typeof latitude !== "number" ||
            typeof longitude !== "number" ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180)) {
        res.status(400).send({
            error: "To order by distance, both latitude and longitude must be valid."
        });
        return null;
    }
    var firstDateFilter;
    if (!req.body.firstDateFilter) {
        firstDateFilter = null;
    }
    else if (!isNaN(Date.parse(req.body.firstDateFilter))) {
        firstDateFilter = new Date(req.body.firstDateFilter);
    }
    else {
        res.status(400).send({
            error: "The firstDateFilter property must be a valid date."
        });
        return null;
    }
    var lastDateFilter;
    if (!req.body.lastDateFilter) {
        lastDateFilter = null;
    }
    else if (!isNaN(Date.parse(req.body.lastDateFilter))) {
        lastDateFilter = new Date(req.body.lastDateFilter);
    }
    else {
        res.status(400).send({
            error: "The lastDateFilter property must be a valid date."
        });
        return null;
    }
    var salaryMin = req.body.salaryMin || null;
    if (salaryMin && typeof salaryMin !== "number") {
        res.status(400).send({
            error: "The salaryMin property must be a number."
        });
        return null;
    }
    return {
        keywords: keywords,
        take: take,
        offset: offset,
        latitude: latitude,
        longitude: longitude,
        radius: radius,
        firstDateFilter: firstDateFilter,
        lastDateFilter: lastDateFilter,
        salaryMin: salaryMin,
        orderBy: orderBy
    };
}
function queryJobs(search, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var queryBuilder, innerQb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.createQueryBuilder()];
                case 1:
                    queryBuilder = _a.sent();
                    addSelects(queryBuilder);
                    return [4 /*yield*/, getInnerQueryBuilder(search, connection)];
                case 2:
                    innerQb = _a.sent();
                    queryBuilder
                        .from("(" + innerQb.getQuery() + ")", "p_search")
                        .setParameters(innerQb.getParameters());
                    addWhere(search, queryBuilder);
                    addOrderBy(search, queryBuilder);
                    return [2 /*return*/, queryBuilder.getRawMany()];
            }
        });
    });
}
function getInnerQueryBuilder(search, connection) {
    return __awaiter(this, void 0, void 0, function () {
        var innerQueryBuilder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection
                        .getRepository(job_1.default)
                        .createQueryBuilder("job")
                        .select("job")
                        .addSelect("setweight(to_tsvector(job.job_title), 'A') ||\n                setweight(to_tsvector(job.description), 'B') ||\n                setweight(to_tsvector(job.company_name), 'A')", "job_document")];
                case 1:
                    innerQueryBuilder = _a.sent();
                    if (search.longitude && search.latitude) {
                        innerQueryBuilder
                            .addSelect("(point(:longitude, :latitude) <@> point(job.longitude, job.latitude)) * 1.609344", "job_distance")
                            .setParameters({
                            longitude: search.longitude,
                            latitude: search.latitude
                        });
                    }
                    return [2 /*return*/, innerQueryBuilder];
            }
        });
    });
}
function addSelects(qb) {
    var PREFIX = "job_";
    Object.keys(new job_1.default()).forEach(function (key, index) {
        if (index === 0) {
            qb.select(PREFIX + key, key);
        }
        else {
            qb.addSelect(PREFIX + key, key);
        }
    });
}
function addWhere(search, qb) {
    qb.where("job_document @@ to_tsquery(:keywords)", {
        keywords: "'" + search.keywords + "'"
    });
    if (search.firstDateFilter) {
        var date = search.firstDateFilter;
        var dateString = "'" + date.getFullYear() + "-" + (date.getMonth() +
            1) + "-" + date.getDate() + "'";
        qb.andWhere("job_start_date >= :firstDate", { firstDate: dateString });
    }
    if (search.lastDateFilter) {
        var date = search.lastDateFilter;
        var dateString = "'" + date.getFullYear() + "-" + (date.getMonth() +
            1) + "-" + date.getDate() + "'";
        qb.andWhere("job_start_date <= :lastDate", { lastDate: dateString });
    }
    if (search.salaryMin) {
        qb.andWhere("job_salary_min >= :salaryMin", {
            salaryMin: search.salaryMin
        });
    }
    if (search.longitude && search.latitude && search.radius) {
        qb.andWhere("job_distance <= :radius", { radius: search.radius });
    }
}
function addOrderBy(search, qb) {
    switch (search.orderBy) {
        case searchRequest_1.OrderBy.Distance:
            qb.orderBy("job_distance");
            break;
        default:
            qb.orderBy("ts_rank(job_document, to_tsquery(:keywords))");
            break;
    }
}
function sanitizeKeywords(raw) {
    return raw
        .trim()
        .replace(/[^\w\s\-]/g, "")
        .replace(/\&/g, "")
        .replace(/\s+/g, " & ");
}
//# sourceMappingURL=searchController.js.map