export interface UserTimeRecord {
  id?: number,
  userId: number
  milestoneId: number,
  actionLabelId: number,
  description?: string,
  week?: string
}
