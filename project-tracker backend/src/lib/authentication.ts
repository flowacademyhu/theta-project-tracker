import { Request, Response, NextFunction } from "express";
import { database } from "./database";
import * as jwt from "jsonwebtoken";
import * as jwtConfig from '../../config/jwt.json'

enum Method {
    post = 'POST'
}

interface AnonymusEndpoint {
    path: string;
    method: Method;
}

const anonymusEndpoints: Array<AnonymusEndpoint> = [
    {
        path: '/login',
        method: Method.post
    }
]

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
    const user: any = await database('users').where({id: userId}).first();
    res.locals.user = user;
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    if(isAnonymusEndpoint(req)) {
        return next();
    }
    try {
        await verifyUser(req, res);
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}
