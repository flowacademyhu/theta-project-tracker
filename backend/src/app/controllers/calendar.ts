import {Request, Response} from "express";
import {TableNames} from "../../lib/enums";
import {database} from "../../lib/database";
import {OvertimeMultiplier} from "../models/overtimeMultiplier";
import * as moment from "moment";

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
  try {
    const year = req.query.year.toString();
    let month: string;
    if (+req.query.month < 10) {
      month = '0' + req.query.month.toString();
    } else {
      month = req.query.month.toString();
    }
    const search = '%' + year + '-' + month + '%';
    const modifiedDates: Array<OvertimeMultiplier> = await database(TableNames.overtimeMultipliers).where('date', 'like', search).select();
    let sqlMomentDateArray: Array<number> = [];
    let multipliersArray: Array<number> = [];
    for (let i = 0; i < modifiedDates.length; i++) {
      sqlMomentDateArray.push(moment(modifiedDates[i].date).dayOfYear());
      multipliersArray.push(modifiedDates[i].multiplier);
    }
    let daysWithMultipliers: Array<object> = [];
    const days = getDaysInMoth(req.query.year, req.query.month);
    for (let i = 1; i <= days; i++) {
      let day: string;
      if (i < 10) {
        day = '0' + i;
      } else {
        day = i.toString();
      }
      let date = year + '-' + month + '-' + day;
      let dayName = getDay(+req.query.year, +req.query.month, i);
      let multiplier: number = 0;
      let momentDate: number = moment().year(year).month(req.query.month - 1).date(i).hour(0).minute(0).second(0).dayOfYear();
      let overridedDate = sqlMomentDateArray.filter(date => date == momentDate);
      if (overridedDate.length == 1) {
        sqlMomentDateArray.shift();
        multiplier = multipliersArray[0];
        multipliersArray.shift();
      } else {
        if (dayName == 'Saturday' || dayName == 'Sunday') {
          multiplier = 2;
        } else {
          multiplier = 1.5;
        }
      }
      daysWithMultipliers.push(
        {
          date: date,
          day: getDay(+req.query.year, +req.query.month, i),
          multiplier: multiplier
        }
      );
    }
    res.status(200).json(daysWithMultipliers);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
