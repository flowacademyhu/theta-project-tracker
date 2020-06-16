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

export const index = (users: Array<any>): Array<UserSerializer> => {
    return users.map((user: any) => show(user));
}
