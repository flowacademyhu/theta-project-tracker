import {TimeRecord} from "../models/timeRecord";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as timeRecordSerializer from "../serializers/timeRecord";
import * as moment from "moment";
import {Moment} from "moment";

export const index = async (req: Request, res: Response) => {
  try {
    let date: Moment;
    let fromDate: string;
    let toDate: string;
    if (req.query.date) {
      date = moment(req.query.date);
      fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
      toDate = date.endOf('isoWeek').format('YYYY-MM-DD');
    } else {
      date = moment();
      fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
      toDate = date.endOf('isoWeek').format('YYYY-MM-DD');
    }
    const query: QueryBuilder = database(TableNames.timeRecords)
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate)
      .where({userId: res.locals.user.id}).select();
    const timeRecords: Array<TimeRecord> = await query;
    res.status(200).json(timeRecords);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {

    const timeRecord: TimeRecord = timeRecordSerializer.create(req);
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
      const newTimeRecord: TimeRecord = timeRecordSerializer.create(req);
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
