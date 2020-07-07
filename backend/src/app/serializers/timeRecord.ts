import * as moment from "moment";
import {Request, Response} from "express";

export const createProjects = (timeRecords: Array<any>) => {
  let projects: Array<object> = [];
  for (let i = 0; i < timeRecords.length / 7; i++) {
    projects.push(
      {
        projectId: timeRecords[i + i * 7].projectId,
        milestoneId: timeRecords[i + i * 7].milestoneId,
        actionLabelId: timeRecords[i + i * 7].actionLabelId,
        description: timeRecords[i + i * 7].description
      }
    );
  }
  return projects;
}

export const createWeek = (fromDate: string) => {
  let fromDatePlusOne: string;
  let days: Array<string> = [];
  for (let i = 0; i < 7; i++) {
    fromDatePlusOne = moment(fromDate).add(i, 'day').format('YYYY-MM-DD');
    days.push(fromDatePlusOne);
  }
  return days;
}

export const createData = (timeRecords: Array<any>) => {
  let data: Array<object> = [];
  for (let i = 0; i < timeRecords.length; i++) {
    data.push(
      {
        id: timeRecords[i].id,
        date: moment(timeRecords[i].date).format('YYYY-MM-DD'),
        normalHours: timeRecords[i].normalHours,
        overTime: timeRecords[i].overTime
      }
    )
  }
  return data;
}

export const createUserTimeRecord = (req: Request, res: Response, fromDate) => {
  return {
    userId: res.locals.user.id,
    milestoneId: req.body.milestoneId,
    actionLabelId: req.body.actionLabelId,
    description: req.body.description,
    week: fromDate
  }
}

export const updateTimeRecord = (fromDate: string, userTimeRecordId: number) => {
  let fromDatePlusOne: string;
  let timeRecords: Array<object> = [];
  for (let i = 0; i < 7; i++) {
    fromDatePlusOne = moment(fromDate).add(i, 'day').format('YYYY-MM-DD');
    timeRecords.push(
      {
        userTimeRecordId: userTimeRecordId,
        date: fromDatePlusOne
      }
    )
  }
  return timeRecords;
}
