export interface TimeRecord {
  id?: number;
  userId: number;
  spentTime: number;
  milestoneId: number;
  description: string;
  actionLabelId: number;
  overtime: number;
  date: Date;
  createdAt?: string;
  updatedAt?: string;
}
