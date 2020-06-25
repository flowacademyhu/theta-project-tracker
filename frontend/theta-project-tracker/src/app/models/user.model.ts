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
  projectId?: number;
  projectName?: string;
  userId?: number;
  costToClientPerHour : number
}
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}