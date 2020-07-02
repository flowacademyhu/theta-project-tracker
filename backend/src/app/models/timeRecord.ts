export interface TimeRecord {
  id?: number;
  userId: number;
  projectId: number;
  milestoneId: number;
  actionLabelId: number;
  description: string;
  spentTime: number;
  overtime: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

/*
[
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
  [{project: project, milestone: milestone, action: action}], [{date: date, normalHour: normalHour, overtime: overtime}], [{date: date, normalHour: normalHour, overtime: overtime}],
]
*/
