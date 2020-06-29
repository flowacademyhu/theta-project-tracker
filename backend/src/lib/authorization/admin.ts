import {NextFunction, Request, Response} from "express";
import {Roles} from "../enums";

export const adminAuthorization = (req: Request, res: Response, next: NextFunction) => {
  if (res.locals.user.role === Roles.admin) {
    return next();
  } else {
    res.sendStatus(403);
  }
}
