import {database} from "../../lib/database";
import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import * as moment from "moment";
import {Moment} from "moment";
import {UserTimeRecord} from "../models/userTimeRecord";

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
    const fromDatePrevous = moment(fromDate).subtract(1, 'week').format('YYYY-MM-DD');
    const toDatePrevious = moment(toDate).subtract(1, 'week').format('YYYY-MM-DD');
    let fromDatePreviousPlusOne: string;
    const query: QueryBuilder = database(TableNames.userTimeRecords)
      .join(TableNames.timeRecords, 'timeRecords.userTimeRecordId', '=', 'userTimeRecords.id')
      .where('date', '>=', fromDatePrevous)
      .where('date', '<=', toDatePrevious)
      .where({userId: res.locals.user.id}).orderBy('timeRecords.id', 'asc')
      .select();
    const timeRecords: Array<any> = await query;

    let userTimeRecord: Array<number> = [];
    for (let i = 0; i < timeRecords.length / 7; i++) {
      userTimeRecord.push(timeRecords[i + i*7].userTimeRecordId);
    }

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
