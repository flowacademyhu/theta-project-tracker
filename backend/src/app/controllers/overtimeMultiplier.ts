import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {database} from "../../lib/database";
import {OvertimeMultiplier} from "../models/overtimeMultiplier";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.overtimeMultipliers).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const overtimeMultipliers: Array<OvertimeMultiplier> = await query;
  res.status(200).json(overtimeMultipliers);
};

export const createOrUpdate = async (req: Request, res: Response) => {
  try {
    const overtimeMultiplier: OvertimeMultiplier = {
      date: req.body.date,
      multiplier: req.body.multiplier
    };
    const duplicate = await database(TableNames.overtimeMultipliers).select().where({date: req.body.date}).first();
    if (duplicate) {
      await database(TableNames.overtimeMultipliers).update(overtimeMultiplier).where({date: req.body.date});
      res.sendStatus(204);
    } else {
      await database(TableNames.overtimeMultipliers).insert(overtimeMultiplier);
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const overtimeMultiplier: OvertimeMultiplier = await database(TableNames.overtimeMultipliers).select().where({date: req.body.date}).first();
    console.log(req.body.date);
    if (overtimeMultiplier) {
      await database(TableNames.overtimeMultipliers).delete().where({date: req.body.date});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
