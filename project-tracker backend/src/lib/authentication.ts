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

const userEndpoints: Array<Endpoint> = [
    {
        path: '/user/:userId/project',
        method: Method.get
    },
    {
        path: '/client',
        method: Method.get
    },
    {
        path: '/client/:id',
        method: Method.get
    },
    {
        path: '/project',
        method: Method.get
    },
    {
        path: '/project/:id',
        method: Method.get
    },
    {
        path: '/milestone',
        method: Method.get
    },
    {
        path: '/milestone/:id',
        method: Method.get
    },
];

const isAnonymusEndpoint = (req: Request): boolean => {
    return !!(anonymusEndpoints.find(
        anonymusEndpoint => (
            anonymusEndpoint.method === req.method && anonymusEndpoint.path === req.path
        )))
}

const isUserEndpoint = (req: Request): boolean => {
    return !!(userEndpoints.find(
        userEndpoints => (
            userEndpoints.method === req.method && userEndpoints.path === req.path
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
        if(res.locals.user.role === 'user') {
            if(isUserEndpoint(req)) {
                return next();
            } else {
                res.sendStatus(401);
            }
        }
        if(res.locals.user.role === 'admin') {
            return next();
        }
    } catch (error) {
        res.sendStatus(401);
    }
}
