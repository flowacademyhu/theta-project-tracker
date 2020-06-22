import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, Role } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { };

  public users: User[] = [{
    id: 1,
    firstName: 'Bence',
    lastName: 'Rácz',
    role: Role.ADMIN,
    email: 'asd@asd.com',
    password: 'asdasd',
    userCostToCompanyPerHour: 50,
    projectAssigned: [
      {projectName: 'xy', userCostPerHour: 50},
      { projectName: 'Project23', userCostPerHour: 50}]
  },
  {
    id: 2,
    firstName: 'Máté',
    lastName: 'Szabó',
    role: Role.USER,
    email: 'asdasd@asd.com',
    password: 'asdasdasd',
    userCostToCompanyPerHour: 70,
    projectAssigned: [
      {projectName: 'xyz', userCostPerHour: 70},
      { projectName: 'Project0', userCostPerHour: 150},
      { projectName: 'Project Zero Dawn', userCostPerHour: 200}]
  }]
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users)

  public fetchUsers (): User[] {
    return this.users
  }
  public fetchUser(id: number) {
    return { ...this.users.find(user => user.id === id) };
  }
  public addUser(user: User) {
    user.id = this.users.length + 1;
    this.users.push(user);
  }
  public updateUser(id: number, user: User) {
    const index = this.users.findIndex(u => u.id === id);
    this.users[index] = user;
  }
  public deleteUser(id: number) {
    this.users.splice(this.users.findIndex(u => u.id === id), 1);
    this.users$.next(this.users);
  } 
}