export interface AuthResponse {
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
