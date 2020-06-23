export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password?: string;
  costToCompanyPerHour: number;
  projectAssigned: ProjectAssigned[];
}
export interface ProjectAssigned {
  projectName: string;
  userCostPerHour: number;
}
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}