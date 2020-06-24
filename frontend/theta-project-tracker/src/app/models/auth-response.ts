export interface Authresponse {
  token: string;
  user: {
    id: number,
    firstName: string,
    lastName: string,
    role: string,
    email: string,
    costToCompanyPerHour: number,
    updatedAt: string,
    createdAt: string
  };
}
