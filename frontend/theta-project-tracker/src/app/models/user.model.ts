export interface User {
  id: number;
  firstName: String;
  lastName: String;
  role: Role;
  email: String;
  password: String;
  userCostToCompanyPerHour: number;
  projectAssigned: ProjectAssigned
}
export interface ProjectAssigned {
  projectName: String,
  userCostPerHour : number
}
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN'
}