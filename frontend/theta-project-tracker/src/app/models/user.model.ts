export interface User {
  id?: number;
  firstName: String;
  lastName: String;
  role: Role;
  email: String;
  password?: String;
  costToCompanyPerHour: number;
  projectAssigned: ProjectAssigned[]
}
export interface ProjectAssigned {
  projectName: string;
  userCostPerHour: number;
}
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}