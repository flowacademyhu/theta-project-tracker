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
