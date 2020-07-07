import {TimeRecord} from "../models/timeRecord";
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
    const toDate = date.endOf('isoWeek').format('YYYY-MM-DD');
    const userTimeRecord = timeRecordSerializer.createUserTimeRecord(req, res);
    let userTimeRecordId;
    const duplicateUserTimeRecord: UserTimeRecord = await database(TableNames.userTimeRecords)
      .where({
        userId: res.locals.user.id,
        milestoneId: req.body.milestoneId,
        actionLabelId: req.body.actionLabelId,
        description: req.body.description
      }).select().first();
    if (duplicateUserTimeRecord) {
      userTimeRecordId = duplicateUserTimeRecord.id;
    } else {
      await database(TableNames.userTimeRecords).insert(userTimeRecord)
        .then(saveId => {userTimeRecordId = database.raw('LAST_INSERT_ID()')})
    }
    const duplicateWeek = await database(TableNames.timeRecords)
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate)
      .where({userTimeRecordId: userTimeRecordId})
      .select();
    if (duplicateWeek.length > 1) {
      res.sendStatus(400);
    } else {
      await database(TableNames.timeRecords).insert(timeRecordSerializer.updateTimeRecord(fromDate, userTimeRecordId));
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
    const toDate = date.endOf('isoWeek').format('YYYY-MM-DD');

    const query: QueryBuilder = database(TableNames.userTimeRecords).where({
      userId: res.locals.user.id,
      milestoneId: req.body.milestoneId,
      actionLabelId: req.body.actionLabelId
    }).select();
    const userTimeRecord: TimeRecord = await query;
    console.log(userTimeRecord[0].id);
    await database(TableNames.timeRecords).where({userTimeRecordId: userTimeRecord[0].id})
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate).delete();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
