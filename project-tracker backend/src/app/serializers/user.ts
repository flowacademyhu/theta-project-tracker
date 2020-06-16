import {User} from "../models/user";

export interface UserSerializer {
    firstName: string,
    lastName: string,
    fullName: string
}

export const show = (user): UserSerializer => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`
    }
};

export const index = (users: Array<User>): Array<UserSerializer> => {
    return users.map((user: User) => show(user));
}