export interface User {
  id?: number;
  firstName: String;
  lastName: String;
  role: Role;
  email: string;
  password?: string;
  costToCompanyPerHour: number;
  projectAssigned: ProjectAssigned[];
}
export interface ProjectAssigned {
  projectId?: number;
  projectName?: String;
  userId?: number;
  costToClientPerHour : number
}
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}