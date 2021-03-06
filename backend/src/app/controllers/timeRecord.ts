import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as moment from "moment";
import {Moment} from "moment";
import {UserTimeRecord} from "../models/userTimeRecord";
import * as timeRecordSerializer from "../serializers/timeRecord";

export const index = async (req: Request, res: Response) => {
  try {
    let date: Moment;
    if (req.query.date) {
      date = moment(req.query.date);
    } else {
      date = moment();
    }
    const fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
    const toDate = date.endOf('isoWeek').format('YYYY-MM-DD');
    const query: QueryBuilder = database(TableNames.milestones)
      .join(TableNames.userTimeRecords, 'milestones.id', '=', 'userTimeRecords.milestoneId')
      .join(TableNames.timeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate)
      .where({userId: res.locals.user.id}).orderBy('timeRecords.id', 'asc')
      .select();
    const timeRecords: Array<any> = await query;
    let response = {
      weekDays: timeRecordSerializer.createWeek(fromDate),
      projects: timeRecordSerializer.createProjects(timeRecords),
      data: timeRecordSerializer.createData(timeRecords)
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    let date: Moment;
    if (req.query.date) {
      date = moment(req.query.date);
    } else {
      date = moment();
    }
    const fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
    const userTimeRecord = timeRecordSerializer.createUserTimeRecord(req, res, fromDate);
    const duplicateUserTimeRecord: UserTimeRecord = await database(TableNames.userTimeRecords)
      .where({
        userId: res.locals.user.id,
        milestoneId: req.body.milestoneId,
        actionLabelId: req.body.actionLabelId,
        week: fromDate
      }).select().first();
    if (duplicateUserTimeRecord) {
      res.sendStatus(400);
    } else {
      const userTimeRecordId = await database(TableNames.userTimeRecords).insert(userTimeRecord);
      await database(TableNames.timeRecords).insert(timeRecordSerializer.updateTimeRecord(fromDate, userTimeRecordId[0]));
      res.sendStatus(201);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const updateArray = req.body.modified;
    for (let item of updateArray) {
      await database(TableNames.timeRecords).update(item).where({id: item.id});
    }
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    let date: Moment;
    if (req.query.date) {
      date = moment(req.query.date);
    } else {
      date = moment();
    }
    const fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
    await database(TableNames.userTimeRecords).where({
      milestoneId: req.body.milestoneId,
      actionLabelId: req.body.actionLabelId,
      week: fromDate
    }).delete();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

export const getStartAndEndDates = async (req: Request, res: Response) => {
  let query: QueryBuilder = database(TableNames.timeRecords)
      .min('date')
      .max('date')
  const report = await query;
  res.status(200).json(report);
}
