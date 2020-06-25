import {Request, Response} from "express";
import * as userSerializer from "../serializers/user";

export const show = (req: Request, res: Response) => {
  if (res.locals.user) {
    res.status(200).json(userSerializer.show(res.locals.user));
  } else {
    res.sendStatus(401);
  }
}
