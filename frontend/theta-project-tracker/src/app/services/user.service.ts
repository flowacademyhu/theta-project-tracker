import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User, Role } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public users: User[] = [{
    id: 1,
    firstName: 'Bence',
    lastName: 'Rácz',
    role: Role.ADMIN,
    email: 'asd@asd.com',
    password: 'asdasd',
    userCostToCompanyPerHour: 50,
    projectAssigned: {projectName: 'xy', userCostPerHour: 50}
  },
  {
    id: 2,
    firstName: 'Máté',
    lastName: 'Szabó',
    role: Role.USER,
    email: 'asdasd@asd.com',
    password: 'asdasdasd',
    userCostToCompanyPerHour: 70,
    projectAssigned: {projectName: 'xyz', userCostPerHour: 70}
  }
  ]
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
    const index = this.users.findIndex(char => char.id === id);
    this.users[index] = user;
  }

  public deleteUser(id: number): Observable<User> {
    return this.http.delete<>(`/$(id)`)
  }

}




