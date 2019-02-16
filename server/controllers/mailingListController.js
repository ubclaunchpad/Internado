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
var mailingListEntry_1 = require("../models/mailingListEntry");
function addToMailingList(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, email, listEntry, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.header("Access-Control-Allow-Origin", "*");
                    connection = typeorm_1.getConnection();
                    email = req.query.email;
                    if ((typeof email) !== "string") {
                        res.status(400).send({ error: "Email address query parameter is required" });
                    }
                    email = sanitizeEmail(email);
                    if (!isValidEmailAddress(email)) {
                        res.status(400).send({ error: "Email address isn't valid" });
                        return [2 /*return*/];
                    }
                    listEntry = { email: email };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .insert()
                            .into(mailingListEntry_1.default)
                            .values([listEntry])
                            .execute()];
                case 2:
                    _a.sent();
                    res.status(201).send({ result: listEntry });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    if (err_1.code === "23505") {
                        res.status(400).send({
                            error: "This email is already on the mailing list"
                        });
                    }
                    else {
                        res.status(500).send({ error: err_1 });
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addToMailingList = addToMailingList;
function deleteFromMailingList(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var connection, email, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    res.header("Access-Control-Allow-Origin", "*");
                    connection = typeorm_1.getConnection();
                    email = sanitizeEmail(req.query.email);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, connection
                            .createQueryBuilder()
                            .delete()
                            .from(mailingListEntry_1.default)
                            .where("email = :email", { email: email })
                            .execute()];
                case 2:
                    _a.sent();
                    res.status(200).send({ result: "Removed " + email + " from mailing list" });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(500).send({ error: err_2 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.deleteFromMailingList = deleteFromMailingList;
function sanitizeEmail(email) {
    return email.trim().toLowerCase();
}
function isValidEmailAddress(email) {
    // Regex taken from https://emailregex.com/
    var regex = new RegExp("^(([^<>()\\[\\]\\.,;:\\s@\\\"]+" +
        "(\\.[^<>()\\[\\]\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))" +
        "@(([^<>()[\\]\\.,;:\\s@\\\"]+\\.)+" +
        "[^<>()[\\]\\.,;:\\s@\\\"]{2,})$", "gi");
    var matches = email.match(regex);
    return matches !== null && matches.length === 1;
}
//# sourceMappingURL=mailingListController.js.map