import {TimeRecord} from "../models/timeRecord";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";

export const index = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.timeRecords).select();
  if (req.query.limit) {
    query = query.limit(req.query.limit);
  }
  if (req.query.offset) {
    query = query.offset(req.query.offset);
  }
  const timeRecords: Array<TimeRecord> = await query;
  res.status(200).json(timeRecords);
};

export const show = async (req: Request, res: Response) => {
  try {
    const timeRecord: TimeRecord = await database(TableNames.timeRecords).select().where({id: req.params.id}).first();
    if (timeRecord) {
      res.status(200).json(timeRecord);
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
    const timeRecord: TimeRecord = {
      userId: req.body.userId,
      spentTime: req.body.spentTime,
      milestoneId: req.body.milestoneId,
      description: req.body.description,
      actionLabelId: req.body.actionLabelId,
      overtime: req.body.overtime,
      date: req.body.date
    }
    await database(TableNames.timeRecords).insert(timeRecord);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const timeRecord: TimeRecord = await database(TableNames.timeRecords).select().where({id: req.params.id}).first();
    if (timeRecord) {
      const newTimeRecord: TimeRecord = {
        userId: req.body.userId,
        spentTime: req.body.spentTime,
        milestoneId: req.body.milestoneId,
        description: req.body.description,
        actionLabelId: req.body.actionLabelId,
        overtime: req.body.overtime,
        date: req.body.date
      }
      await database(TableNames.timeRecords).update(newTimeRecord).where({id: req.params.id});
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
    const timeRecord: TimeRecord = await database(TableNames.timeRecords).select().where({id: req.params.id}).first();
    if (timeRecord) {
      await database(TableNames.timeRecords).delete().where({id: req.params.id});
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
