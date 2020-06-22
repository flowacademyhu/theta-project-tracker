import {Request, Response, NextFunction} from "express";
import {database} from "./database";
import * as jwt from "jsonwebtoken";
import * as jwtConfig from '../../config/jwt.json'
import {User} from "../app/models/user";

enum Method {
    get = 'GET',
    post = 'POST',
    put = 'PUT',
    destroy = 'DELETE'
}

interface Endpoint {
    path: string;
    method: Method;
}

const anonymusEndpoints: Array<Endpoint> = [
    {
        path: '/login',
        method: Method.post
    }
];

const isAnonymusEndpoint = (req: Request): boolean => {
    return !!(anonymusEndpoints.find(
        anonymusEndpoint => (
            anonymusEndpoint.method === req.method && anonymusEndpoint.path === req.path
        )))
}

const verifyUser = async (req: Request, res: Response) => {
    const token: string = req.headers.authorization.split(' ')[1];
    const info = jwt.verify(token, jwtConfig.secret);
    const userId: number = info.userId;
    const user: User = await database('users').where({id: userId}).first();
    res.locals.user = user;
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    if (isAnonymusEndpoint(req)) {
        return next();
    }
    try {
        await verifyUser(req, res);
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}

export const authorization = (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.user.role === 'admin') {
        return next();
    } else {
        res.sendStatus(403);
    }
}
