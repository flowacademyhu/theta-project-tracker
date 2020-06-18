import {User} from "../models/user";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {ProjectUser} from "../models/projectUser";

export const index = async (req: Request, res: Response) => {
    let query: QueryBuilder = database(TableNames.users).select();
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
        const user: User = await database(TableNames.users).select().where({id: req.params.id}).first();
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

const createProjectUser = async (req: Request) => {
    const userId: number = await database(TableNames.users).select().where({email: req.body.email}).first();
    const projects: Array<ProjectUser> = req.body.projectAssigned;
    let projectUser: Array<ProjectUser> = [];
    for (let i = 0; i < projects.length; i++) {
        projectUser.push({
            userId: userId,
            projectId: projects[i].projectId,
            costToClientPerHour: projects[i].costToClientPerHour
        });
    }
    await database(TableNames.projectUsers).insert(projectUser);
}

export const create = async (req: Request, res: Response) => {
    try {
        const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
        const user: User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: req.body.role,
            email: req.body.email,
            password: encryptedPassword,
            costToCompanyPerHour: req.body.costToCompanyPerHour
        }
        await database(TableNames.users).insert(user);
        await createProjectUser(req);
        res.sendStatus(201);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const updateProjectUser = async (req: Request) => {
    const projects: Array<ProjectUser> = req.body.projectAssigned;
    await database(TableNames.projectUsers).update(projects).where({userId: req.body.userId});
}

export const update = async (req: Request, res: Response) => {
    try {
        const user: User = await database(TableNames.users).select().where({id: req.params.id}).first();
        if (user) {
            const newUser: User = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: req.body.role,
                email: req.body.email,
                costToCompanyPerHour: req.body.costToCompanyPerHour
            }
            await database(TableNames.users).update(newUser).where({id: req.params.id});
            await updateProjectUser(req);
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
            await database(TableNames.projectUsers).delete().where({userId: req.params.id});
            await database(TableNames.users).delete().where({id: req.params.id});
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
