export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: Role;
  email: string;
  password: string;
  costToCompanyPerHour: number;
  projects: UserCreateProjects[];
}
export interface ProjectAssigned {
  projectId?: number;
  projectName?: string;
  costToClientPerHour : number
}
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}
export interface UserCreate {
  user : {
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    password: string;
    costToCompanyPerHour: number;
  },
  projects: UserCreateProjects[]
}
export interface UserCreateProjects {
  projectName?: string,
  projectId: number,
  costToClientPerHour: number
}