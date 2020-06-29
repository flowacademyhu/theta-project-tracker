import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role, UserCreate } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public fetchUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'user');
  }
  public fetchUser(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + `user/${id}`);
  }
  public addUser(user: UserCreate): Observable<User> {
    return this.http.post<User>(this.apiUrl + 'user', user);
  }
  public updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + `user/${id}`, user);
  }
  public deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(this.apiUrl + `user/${id}`).pipe(tap(() => this.fetchUsers()));
  }
  updatePassword(password, newPassword) {
    let editable = this.users.find(u => u.password === password);
    editable.password = newPassword;
  }
  updataEmail(password, newEmail) {
    let editable = this.users.find(u => u.password === password);
    editable.email = newEmail;
  }
}