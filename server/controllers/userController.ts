const { User }          = require("../models");
const authService       = require("../services/AuthService");
const { to, ReE, ReS }  = require("../services/util");
import { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    const body = req.body;

    if (!body.unique_key && !body.email && !body.phone) {
        return ReE(res, "Please enter an email or phone number to register.");
    } else if (!body.password) {
        return ReE(res, "Please enter a password to register.");
    } else {
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if (err) { return ReE(res, err, 422); }
        return ReS(res, {message: "Successfully created new user.", user: user.toWeb(), token: user.getJWT()}, 201);
    }
}

export async function get(req: Request, res: Response) {
    let user = req.user;

    return ReS(res, {user: user.toWeb()});
}

export async function update(req: Request, res: Response) {
    let err, user, data;
    user = req.user;
    data = req.body;
    user.set(data);

    [err, user] = await to(user.save());
    if (err) {
        if (err.message === "Validation error") { err = "The email address or phone number is already in use"; }
        return ReE(res, err);
    }
    return ReS(res, {message : "Updated User: " + user.email});
}

export async function remove(req: Request, res: Response) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) { return ReE(res, "error occured trying to delete user"); }

    return ReS(res, {message: "Deleted User"}, 204);
}

export async function login(req: Request, res: Response) {
    const body = req.body;
    let err, user;

    [err, user] = await to(authService.authUser(req.body));
    if (err) { return ReE(res, err, 422); }

    return ReS(res, {token: user.getJWT(), user: user.toWeb()});
}
