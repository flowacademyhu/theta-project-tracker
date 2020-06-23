import {ProjectUser} from "../models/projectUser";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {User} from "../models/user";
import * as userSerializer from '../serializers/user'

export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users)
        .join(TableNames.projectUsers, 'users.id', '=', 'projectUsers.userId')
        .where({projectId: req.params.projectId}).whereNull('deletedAt').select();
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
        const projectUser: Array<ProjectUser> = [];
        if (req.body.length > 0) {
            for (let i = 0; i < req.body.length; i++) {
                projectUser.push({
                    userId: +req.params.userId,
                    projectId: req.body[i].projectId,
                    costToClientPerHour: req.body[i].costToClientPerHour
                });
            }
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
        const projectUser: Array<ProjectUser> = [];
        if (req.body.length > 0) {
            for (let i = 0; i < req.body.length; i++) {
                projectUser.push({
                    userId: +req.params.userId,
                    projectId: req.body[i].projectId,
                    costToClientPerHour: req.body[i].costToClientPerHour
                });
                await database(TableNames.projectUsers).update('deletedAt', database.raw('CURRENT_TIMESTAMP')).where(projectUser[i]);
            }
            res.sendStatus(204);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
