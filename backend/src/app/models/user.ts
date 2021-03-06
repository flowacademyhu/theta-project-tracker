import {Roles} from "../../lib/enums";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  role: Roles;
  email: string;
  password?: string;
  costToCompanyPerHour: number;
  createdAt?: string;
  updatedAt?: string;
}
