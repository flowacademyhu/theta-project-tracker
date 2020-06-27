import {User} from "../models/user";
import {database} from "../../lib/database";

export interface UserSerializer {
  id: number,
  firstName: string,
  lastName: string,
  role: string,
  email: string,
  costToCompanyPerHour: number,
  updatedAt: string,
  createdAt: string
}

export const show = (user): UserSerializer => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    costToCompanyPerHour: user.costToCompanyPerHour,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  }
};

export const index = (users: Array<User>): Array<UserSerializer> => {
  return users.map((user: User) => show(user));
}

export const destroy = (user) => {
  return {
    email: user.email + ' ' + '(deleted)',
    deletedAt: database.raw('CURRENT_TIMESTAMP'),
    deletedAtUnix: database.raw('UNIX_TIMESTAMP()')
  }
}

export const createUser = (user, password): User => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    email: user.email,
    password: password,
    costToCompanyPerHour: user.costToCompanyPerHour
  }
}
