import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as moment from "moment";
import {Moment} from "moment";
import * as timeRecordSerializer from "../serializers/timeRecord";
import {UserTimeRecord} from "../models/userTimeRecord";
import * as userTimeRecordSerializer from "../serializers/userTimeRecord";
import {TimeRecord} from "../models/timeRecord";
import * as _ from "lodash";

const pastArray = async (res: Response, fromDatePrevious) => {
  const pastWeekQuery: QueryBuilder = database(TableNames.userTimeRecords)
    .where('week', '=', fromDatePrevious)
    .where({userId: res.locals.user.id})
    .select();
  return pastWeekQuery;
}

const currentArray = async (res: Response, fromDate) => {
   const currentWeekQuery: QueryBuilder = database(TableNames.userTimeRecords)
    .where('week', '=', fromDate)
    .where({userId: res.locals.user.id})
    .select();
   return currentWeekQuery;
}

const compareAndCreate = async (pastWeekArray, currentWeekArray, fromDate) => {
  const diff = _.differenceBy(pastWeekArray, currentWeekArray, 'milestoneId', 'actionLabelId');
  let newUserTimeRecords: Array<UserTimeRecord> = userTimeRecordSerializer.copy(diff, fromDate);
  let newUserTimeRecordIds: Array<number> = [];
  for (let item of newUserTimeRecords) {
    newUserTimeRecordIds.push(await database(TableNames.userTimeRecords).insert(item));
  }
  let newTimeRecords: Array<TimeRecord> = timeRecordSerializer.copy(newUserTimeRecordIds, pastWeekArray, fromDate);
  await database(TableNames.timeRecords).insert(newTimeRecords);
}

export const create = async (req: Request, res: Response) => {
  try {
    let date: Moment;
    if (req.query.date) {
      date = moment(req.query.date);
    } else {
      date = moment();
    }
    const fromDate = date.startOf('isoWeek').format('YYYY-MM-DD');
    const fromDatePrevious = moment(fromDate).subtract(1, 'week').format('YYYY-MM-DD');
    const pastWeekArray = await pastArray(res, fromDatePrevious);
    const currentWeekArray = await currentArray(res, fromDate);
    await compareAndCreate(pastWeekArray, currentWeekArray, fromDate);
    res.sendStatus(201);
  } catch
    (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
