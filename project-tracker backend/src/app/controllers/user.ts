import {User} from "../models/user";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import * as userSerializer from '../serializers/user';
import * as bcrypt from 'bcrypt';
import {QueryBuilder} from "knex";
import {Roles, TableNames} from "../../lib/enums";

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
  let user: User;
  try {
    if (res.locals.user.role !== Roles.admin) {
      user = res.locals.user;
    } else {
      user = await database(TableNames.users).select().where({id: req.params.id}).first();
    }
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
      const newUser: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        costToCompanyPerHour: req.body.costToCompanyPerHour
      }
      let userId: number;
      if (res.locals.user.role !== Roles.admin) {
        userId = res.locals.user.id;
      } else {
        userId = +req.params.id;
      }
      await database(TableNames.users).update(newUser).where({id: userId});
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
