import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserCreate, PasswordEmailChange, UserUpdate } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const httpOptions: object = {responseType: 'text'};
    return this.http.post(this.apiUrl + 'user', user, httpOptions);
  }
  public updateUser(id: number, user: UserUpdate): Observable<string> {
    const httpOptions: object = {responseType: 'text'};
    return this.http.put<string>(this.apiUrl + `user/${id}`, user, httpOptions);
  }
  public deleteUser(id: number) {
    return this.http.delete(this.apiUrl + `user/${id}`).pipe(tap(() => this.fetchUsers()));
  }
  updatePassword(passwordChanges: PasswordEmailChange) {
    const httpOptions: object = {responseType: 'text'};
    return this.http.put(this.apiUrl + 'user/profile', passwordChanges, httpOptions)
  }
  updateEmail(emailChanges: PasswordEmailChange) {
    const httpOptions: object = {responseType: 'text'};
   return this.http.put(this.apiUrl + 'user/profile', emailChanges, httpOptions)
  }
}
