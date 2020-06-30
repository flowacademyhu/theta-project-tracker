import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, Role, UserCreate, PasswordEmailChange, UserUpdate } from '../models/user.model';
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
  public addUser(user: UserCreate) {
    return this.http.post(this.apiUrl + 'user', user);
  }
  public updateUser(id: number, user: UserUpdate): Observable<UserUpdate> {
    return this.http.put<UserUpdate>(this.apiUrl + `user/${id}`, user);
  }
  public deleteUser(id: number) {
    return this.http.delete(this.apiUrl + `user/${id}`).pipe(tap(() => this.fetchUsers()));
  }
  updatePassword(passwordChanges: PasswordEmailChange) {
    return this.http.put(this.apiUrl + 'user/profile', passwordChanges)
  }
  updateEmail(emailChanges: PasswordEmailChange) {
   return this.http.put(this.apiUrl + 'user/profile', emailChanges)
  }
}