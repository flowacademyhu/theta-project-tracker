import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as moment from "moment";
import {Moment} from "moment";
import * as timeRecordSerializer from "../serializers/timeRecord";

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
    const fromDatePrevious = moment(fromDate).subtract(1, 'week').format('YYYY-MM-DD');
    const toDatePrevious = moment(toDate).subtract(1, 'week').format('YYYY-MM-DD');
    const query: QueryBuilder = database(TableNames.userTimeRecords)
      .join(TableNames.timeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
      .where('date', '>=', fromDatePrevious)
      .where('date', '<=', toDatePrevious)
      .where({userId: res.locals.user.id}).orderBy('timeRecords.id', 'asc')
      .select();
    const timeRecords: Array<any> = await query;
    let userTimeRecord: Array<number> = [];
    for (let i = 0; i < timeRecords.length / 7; i++) {
      userTimeRecord.push(timeRecords[i + i * 7].userTimeRecordId);
    }
    for (let id of userTimeRecord) {
      const duplicateWeek = await database(TableNames.timeRecords)
        .where('date', '>=', fromDate)
        .where('date', '<=', toDate)
        .where({userTimeRecordId: id}).select().first();
      if (!duplicateWeek) {
        await database(TableNames.timeRecords).insert(timeRecordSerializer.updateTimeRecord(fromDate, id));
      }
    }
    res.sendStatus(201);
  } catch
    (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
