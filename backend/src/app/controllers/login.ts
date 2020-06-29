import {database} from "../../lib/database";
import {Request, Response} from "express";
import * as jwt from 'jsonwebtoken'
import * as jwtConfig from '../../../config/jwt.json'
import * as bcrypt from 'bcrypt';
import * as loginSerializer from '../serializers/login'
import {User} from "../models/user";

const createToken = async (req: Request, res: Response) => {
    const user: User = await database('users').select().where({email: req.body.email}).where({deletedAt: 0}).first();
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const info = {userId: user.id}
        const token = jwt.sign(info, jwtConfig.secret, {expiresIn: '24h'});
        res.status(200).json(loginSerializer.create(token));
    } else {
        res.sendStatus(404);
    }
}

export const create = async (req: Request, res: Response) => {
  try {
    await createToken(req, res);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
