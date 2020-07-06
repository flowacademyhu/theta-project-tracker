export interface TimeRecord {
  id?: number;
  userTimeRecordId: number,
  normalHours: number;
  overTime: number;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}
