import { Injectable } from '@angular/core';
import { Role, User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { id: 1,
      firstName: 'Admin Test',
      lastName: 'Admin',
      role: Role.ADMIN,
      email: 'admin',
      password: 'asd',
      userCostToCompanyPerHour: 2,
      projectAssigned: { projectName: 'Voodoo', userCostPerHour: 2 } },
    { id: 2,
      firstName: 'USer Test',
      lastName: 'User',
      role: Role.USER,
      email: 'user',
      password: 'asd',
      userCostToCompanyPerHour: 2,
      projectAssigned: { projectName: 'Voodoo', userCostPerHour: 2 } },
  ];
  private loggedInUser: User;

  public login(email: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user) {
          this.loggedInUser = user;
          resolve(true);
        }
        reject(false);
      }, 500);
    });
  }

  public logout() {
    this.loggedInUser = null;
  }

  public authenticate(): User {
    return this.loggedInUser;
  }

  public authenticateAsync(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedInUser);
      }, 100);
    });
  }
}
