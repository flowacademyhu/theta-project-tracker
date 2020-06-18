import { ProjectUser } from "../models/projectUser";
import { database } from "../../lib/database";
import { Request, Response } from "express";
import { QueryBuilder } from "knex";
import { TableNames } from "../../lib/tableNames";

import { User } from "../models/user";
import * as userSerializer from '../serializers/user'


export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users).join(TableNames.projectUsers, 'users.id', '=', 'projectUsers.userId').where({ projectId: req.params.projectId }).select();
    if (req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
        query = query.offset(req.query.offset);
    }
    const users: Array<User> = await query;
    res.json(userSerializer.index(users));
};

export const create = async (req: Request, res: Response) => {
    try {
        const projectUser: ProjectUser = {
            userId: Number(req.params.userId),
            projectId: Number(req.params.projectId),
            costToClientPerHour: req.body.costToClientPerHour
        }
        await database(TableNames.projectUsers).insert(projectUser);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const destroy = async (req: Request, res: Response) => {
    try {
        const projectUser: ProjectUser = await database(TableNames.projectUsers).select().where({ userid: req.params.userId, projectId: req.params.projectId }).first();
        if (projectUser) {
            await database(TableNames.projectUsers).delete().where({ userId: req.params.userId, projectId: req.params.projectId });
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
