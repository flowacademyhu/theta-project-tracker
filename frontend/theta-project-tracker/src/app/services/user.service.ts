import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient  ) { }

  public users: User[] = [{
    id: 1,
    firstName: 'Bence',
    lastName: 'Rácz',
    role: Role.ADMIN,
    email: 'asd@asd.com',
    password: 'asdasd',
    costToCompanyPerHour: 50,
    projectAssigned: [
      {projectName: 'xy', costToClientPerHour: 50},
      { projectName: 'Project23', costToClientPerHour: 50}]
  },
  {
    id: 2,
    firstName: 'Máté',
    lastName: 'Szabó',
    role: Role.USER,
    email: 'asdasd@asd.com',
    password: 'asdasdasd',
    costToCompanyPerHour: 70,
    projectAssigned: [
      {projectName: 'xyz', costToClientPerHour: 70},
      { projectName: 'Project0', costToClientPerHour: 150},
      { projectName: 'Project Zero Dawn', costToClientPerHour: 200}]
  }]
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.baseUrl + 'user');
  }
  public fetchUser(id: number) {
    return this.http.get<User>(environment.baseUrl + `user/${id}`) };

  public addUser(user: User) {
    return this.http.post<User>(environment.baseUrl + 'user', user) };

  public updateUser(id: number, user: User) {
    return this.http.put<User>(environment.baseUrl + `user/${id}`, user)
  }
  public deleteUser(id: number) {
    return this.http.delete<User>(environment.baseUrl + `user/${id}`)
  }
}
