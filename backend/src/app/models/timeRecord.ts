export interface TimeRecord {
  id?: number;
  userId: number;
  projectId: number;
  milestoneId: number;
  actionLabelId: number;
  description: string;
  spentTime: number;
  overTime: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

/*
[
  ["2020-03-16", "2020-03-17", "2020-03-18"],
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
]
*/
