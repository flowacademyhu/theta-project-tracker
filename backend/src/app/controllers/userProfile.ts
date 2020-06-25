import {Request, Response} from "express";
import * as userSerializer from "../serializers/user";
import {User} from "../models/user";
import * as bcrypt from 'bcrypt';
import {TableNames} from "../../lib/enums";
import {database} from "../../lib/database";

export const show = (req: Request, res: Response) => {
  if (res.locals.user) {
    res.status(200).json(userSerializer.show(res.locals.user));
  } else {
    res.sendStatus(401);
  }
}

const emailUpdate = (req: Request, res: Response) => {
  let email: string;
  if (req.body.newEmail) {
    email = req.body.newEmail;
  } else {
    email = res.locals.user.email;
  }
  return email;
}

const passwordUpdate = (req: Request, res: Response) => {
  let encryptedPassword: string;
  if (req.body.newPassword) {
    encryptedPassword = bcrypt.hashSync(req.body.newPassword, 10);
  } else {
    encryptedPassword = res.locals.user.password;
  }
  return encryptedPassword;
}

export const update = async (req: Request, res: Response) => {
  if (res.locals.user) {
    const newUser: User = {
      firstName: res.locals.user.firstName,
      lastName: res.locals.user.lastName,
      role: res.locals.user.role,
      email: emailUpdate(req, res),
      password: passwordUpdate(req, res),
      costToCompanyPerHour: res.locals.user.costToCompanyPerHour
    }
    try {
      if (bcrypt.compareSync(req.body.password, res.locals.user.password)) {
        await database(TableNames.users).update(newUser).where({id: res.locals.user.id});
        res.sendStatus(200)
      } else {
        res.sendStatus(400);
      }
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(401);
  }
}
