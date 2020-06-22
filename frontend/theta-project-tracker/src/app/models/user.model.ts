export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password?: string;
  userCostToCompanyPerHour: number;
  projectAssigned: ProjectAssigned[];
}
export interface ProjectAssigned {
  projectName: string;
  userCostPerHour: number;
}
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}
