import {User} from "../models/user";

export interface UserSerializer {
    id: number,
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    costToCompanyPerHour: number
}

export const show = (user): UserSerializer => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        costToCompanyPerHour: user.costToCompanyPerHour
    }
};

export const index = (users: Array<User>): Array<UserSerializer> => {
    return users.map((user: User) => show(user));
}
