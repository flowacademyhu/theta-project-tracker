import {User} from "../models/user";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {ProjectUser} from "../models/projectUser";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.users).select().where({deletedAt: 0});
  let queryClone: Array<User> = await query.clone();
  const pageIndex: number = req.query.offset;
  const pageSize: number = req.query.limit;
  let count = queryClone.length;
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const users: Array<User> = await query;
  const response: object = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    count: count,
    data: userSerializer.index(users)
  }
  res.status(200).json(response);
}

export const show = async (req: Request, res: Response) => {
  try {
     const user = await database(TableNames.users).select().where({id: req.params.id}).where({deletedAt: 0}).first();
    if (user) {
      res.status(200).json(userSerializer.show(user));
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

const createProjects = async (req: Request) => {
  const projects: Array<ProjectUser> = req.body.projects;
  let projectsToSave: Array<ProjectUser> = [];
  const user: User = await database(TableNames.users).select()
    .where({email: req.body.user.email}).first();
  const userId: number = user.id;
  if (projects.length > 0) {
    for (let project of projects) {
      projectsToSave.push(
        {
          userId: userId,
          projectId: project.projectId,
          costToClientPerHour: project.costToClientPerHour
        }
      );
    }
    await database(TableNames.projectUsers).insert(projectsToSave);
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const duplicate: User = await database(TableNames.users).select().where({email: req.body.user.email}).first();
    if (duplicate) {
      res.sendStatus(400);
    } else {
      const encryptedPassword = bcrypt.hashSync(req.body.user.password, 10);
      const user = userSerializer.createUser(req.body.user, encryptedPassword);
      await database(TableNames.users).insert(user);
      await createProjects(req);
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const user: User = await database(TableNames.users).select().where({id: +req.params.id}).first();
    if (user) {
      const encryptedPassword = user.password;
      const newUser = userSerializer.createUser(req.body.user, encryptedPassword);
      await database(TableNames.users).update(newUser).where({id: +req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const user: User = await database(TableNames.users).select().where({id: req.params.id}).first();
    if (user) {
      await database(TableNames.projectUsers).delete().where({userId: req.params.id});
      await database(TableNames.users).update(userSerializer.destroy(user)).where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
