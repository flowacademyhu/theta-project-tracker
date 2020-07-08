import {UserTimeRecord} from "../models/userTimeRecord";
import * as moment from "moment";

export const copy = (joinedTimeRecords: Array<any>, fromdate) => {
  let userTimeRecord: Array<UserTimeRecord> = [];
  for (let item of joinedTimeRecords) {
  userTimeRecord.push({
    userId: item.userId,
    milestoneId: item.milestoneId,
    actionLabelId: item.actionLabelId,
    description: item.description,
    week: fromdate
  });
}
  return userTimeRecord;
}
