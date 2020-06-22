import {User} from "../models/user";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {ProjectUser} from "../models/projectUser";
import {createUser} from "../serializers/userCreate";

export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users).select().where({deletedAt: null});
    if (req.query.limit) {
        query = query.limit(req.query.limit);
    }
    if (req.query.offset) {
        query = query.offset(req.query.offset);
    }
    const users: Array<User> = await query;
    res.json(userSerializer.index(users));
};

export const show = async (req: Request, res: Response) => {
    try {
        const user: User = await database(TableNames.users).select().where({id: req.params.id, deletedAt: null}).first();
        if (user) {
            res.json(userSerializer.show(user));
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const createProjects = async (req: Request) => {
    const projects: Array<ProjectUser> = req.body.projects;
    let projectsToSave: Array<ProjectUser> = [];
    const user: User = await database(TableNames.users).select()
        .where({email: req.body.user.email}).first();
    const userId: number = user.id;
    if (projects.length > 0) {
        for(let i = 0; i < projects.length; i++) {
            projectsToSave.push(
                {
                    userId: userId,
                    projectId: projects[i].projectId,
                    costToClientPerHour: projects[i].costToClientPerHour
                }
            );
        }
        await database(TableNames.projectUsers).insert(projectsToSave);
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.user.password, 10);
        const user= createUser(req.body.user, encryptedPassword);
        await database(TableNames.users).insert(user);
        await createProjects(req);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const user: User = await database(TableNames.users).select().where({id: req.params.id}).first();
        if (user) {
            const encryptedPassword = bcrypt.hashSync(req.body.user.password, 10);
            const newUser= createUser(req.body.user, encryptedPassword);
            await database(TableNames.users).update(newUser).where({id: user.id});
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

export const destroy = async (req: Request, res: Response) => {
    try {
        const user: User = await database(TableNames.users).select().where({id: req.params.id}).first();
        if (user) {
            await database(TableNames.projectUsers).update('deletedAt', database.raw('CURRENT_TIMESTAMP')).where({userId: req.params.id});
            await database(TableNames.users).update('deletedAt', database.raw('CURRENT_TIMESTAMP')).where({id: req.params.id});
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
