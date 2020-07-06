import {TimeRecord} from "../models/timeRecord";
import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as moment from "moment";
import {Moment} from "moment";
import {UserTimeRecord} from "../models/userTimeRecord";
import {Milestone} from "../models/milestone";

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
    const query: QueryBuilder = database(TableNames.userTimeRecords)
      .join(TableNames.timeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate)
      .where({userId: res.locals.user.id}).orderBy('timeRecords.id', 'asc')
      .select();
    const timeRecords: Array<any> = await query;
    let fromDatePlusOne: string;
    let response = {
      weekDays: [],
      projects: [],
      data: []
    }
    for (let i = 0; i < 7; i++) {
      fromDatePlusOne = moment(fromDate).add(i, 'day').format('YYYY-MM-DD');
      response.weekDays.push(fromDatePlusOne);
    }
    let projectId: Milestone;
    for (let i = 0; i < timeRecords.length / 7; i++) {
      if (i % 7 == 0) {
        projectId = await database(TableNames.milestones).where({id: timeRecords[i + i * 7].milestoneId, deletedAt: 0}).select().first();
      }
      response.projects.push(
          {
            projectId: projectId.projectId,
            milestoneId: timeRecords[i + i * 7].milestoneId,
            actionLabelId: timeRecords[i + i * 7].actionLabelId,
            description: timeRecords[i + i * 7].description
          }
      );
    }
    for (let i = 0; i < timeRecords.length; i++) {
      response.data.push(
          {
            id: timeRecords[i].id,
            date: moment(timeRecords[i].date).format('YYYY-MM-DD'),
            normalHours: timeRecords[i].normalHours,
            overTime: timeRecords[i].overTime
          }
      )
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    let timeRecords: Array<object> = [];
    let date: Moment;
    if (req.query.date) {
      date = moment(req.query.date);
    } else {
      date = moment();
    }
    const fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
    const toDate = date.endOf('isoWeek').format('YYYY-MM-DD');
    let fromDatePlusOne: string;
    const userTimeRecord = {
      userId: res.locals.user.id,
      milestoneId: req.body.milestoneId,
      actionLabelId: req.body.actionLabelId,
      description: req.body.description
    }
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
      for (let i = 0; i < 7; i++) {
        fromDatePlusOne = moment(fromDate).add(i, 'day').format('YYYY-MM-DD');
        timeRecords.push(
          {
            userTimeRecordId: userTimeRecordId,
            date: fromDatePlusOne
          }
        )
      }
      await database(TableNames.timeRecords).insert(timeRecords);
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
