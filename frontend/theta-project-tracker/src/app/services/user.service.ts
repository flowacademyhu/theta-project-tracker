import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { User, Role } from '../models/user.model';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
    costToCompanyPerHour: 50,
    projectAssigned: [{projectName: 'xy', userCostPerHour: 50}]
  },
  {
    id: 2,
    firstName: 'Máté',
    lastName: 'Szabó',
    role: Role.USER,
    email: 'asdasd@asd.com',
    password: 'asdasdasd',
    costToCompanyPerHour: 70,
    projectAssigned: [{projectName: 'xyz', userCostPerHour: 70}]
  }]
  users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.users);

  apiUrl: string = environment.baseUrl;
  authHeader = new HttpHeaders({ Authorization: 
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5MjU1OTkyOX0.3VIjMMHDUbVovDbFkQ-PxM7wpFi3hz5h6qvk_c21QPc'});
  
  public fetchUsers(): Observable<User[]> {
   return this.http.get<User[]>(this.apiUrl + 'user', {headers: this.authHeader});
  }

  public fetchUser(id: number) {
    return this.http.get<User>(this.apiUrl + `user/${id}`, { headers: this.authHeader});
  }
  
  public addUser(user: User) {
   return this.http.post<User>(this.apiUrl + 'user', user, { headers: this.authHeader, responseType: 'text' });
  }

  public updateUser(id: number, user: User) {
    return this.http.put(this.apiUrl + `user/${id}`, user, {headers: this.authHeader, responseType: 'text'  });
  }
  public deleteUser(id: number) {
    return this.http.delete(this.apiUrl + `user/${id}`, {headers: this.authHeader}).pipe(
      tap(() => this.fetchUsers())
    );
  } 
}