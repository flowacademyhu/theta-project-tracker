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

export const show = async (req: Request, res: Response) => {
  try {
    const multiplier: OvertimeMultiplier = await database(TableNames.overtimeMultipliers).select().where({id: req.params.id}).first();
    if (multiplier) {
      res.status(200).json(multiplier);
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
    const duplicate = await database(TableNames.overtimeMultipliers).select().where({date: req.body.date}).first();
    if (duplicate) {
      res.sendStatus(400);
    } else {
      const overtimeMultiplier: OvertimeMultiplier = {
        date: req.body.date,
        multiplier: req.body.multiplier
      };
      await database(TableNames.overtimeMultipliers).insert(overtimeMultiplier);
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const overtimeMultiplier: OvertimeMultiplier = await database(TableNames.overtimeMultipliers).select()
      .where({id: req.params.id}).first();
    if (overtimeMultiplier) {
      const newOvertimeMultiplier: OvertimeMultiplier = {
        date: req.body.date,
        multiplier: req.body.multiplier
      }
      await database(TableNames.overtimeMultipliers).update(newOvertimeMultiplier).where({id: req.params.id});
      res.sendStatus(204);
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
    const overtimeMultiplier: OvertimeMultiplier = await database(TableNames.overtimeMultipliers).select().where({id: req.params.id}).first();
    if (overtimeMultiplier) {
      await database(TableNames.overtimeMultipliers).delete().where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
