import { User } from "../models/user";
import { Roles } from "../../lib/roles";

export interface UserSerializer {
    id?: number;
    firstName: string;
    lastName: string;
    role: Roles;
    costToCompanyPerHour: number;
    createdAt?: string;
    updatedAt?: string;
}

export const show = (user): UserSerializer => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        costToCompanyPerHour: user.costToCompanyPerHour,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
};

export const index = (users: Array<User>): Array<UserSerializer> => {
    return users.map((user: User) => show(user));
}
