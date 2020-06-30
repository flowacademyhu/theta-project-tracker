import {Request, Response} from "express";
import {QueryBuilder} from "knex";
import {TableNames} from "../../lib/enums";
import {database} from "../../lib/database";
import {OvertimeMultiplier} from "../models/overtimeMultiplier";

let weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const getDaysInMoth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
}

const getDay = (year, month, day) => {
  return weekday[new Date(year, month - 1, day).getDay()];
};

export const index = async (req: Request, res: Response) => {
  try{
    const year = req.query.year.toString();
    const month = req.query.month.toString();
    const search = '[' + year + ']' + '-' + '[' + month + ']';
    const dates: Array<OvertimeMultiplier> = await database(TableNames.overtimeMultipliers).where('date', 'like', search).select();

    let daysWithMultipliers: Array<object> = [];

    const days = getDaysInMoth(req.query.year, req.query.month);
    for (let i = 0; i < days; i++) {
      let data: object;
      if (i < 10) {
        data = {
          date: year + '-' + month + '-' + '0' + i.toString(), // 2020-07-02
          day: getDay(year, month, 
        }
      }
      daysWithMultipliers.push(data);
    }


  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
