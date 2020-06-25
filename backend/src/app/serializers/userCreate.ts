export interface UserCreateSerializer {
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    password: string,
    costToCompanyPerHour: number
}

export const createUser = (user, password): UserCreateSerializer => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        password: password,
        costToCompanyPerHour: user.costToCompanyPerHour
    }
}
