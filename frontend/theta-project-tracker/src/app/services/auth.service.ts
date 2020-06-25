import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Role, User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth-response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      firstName: 'Admin Test',
      lastName: 'Admin',
      role: Role.ADMIN,
      email: 'admin@admin',
      password: 'asd',
      costToCompanyPerHour: 2,
      projectAssigned: [{ projectName: 'Voodoo', costToClientPerHour: 2 }] },
    { id: 2,
      firstName: 'USer Test',
      lastName: 'User',
      role: Role.USER,
      email: 'user@user',
      password: 'asd',
      costToCompanyPerHour: 2,
      projectAssigned: [{ projectName: 'Voodoo', costToClientPerHour: 2 }, { projectName: 'mindegy', costToClientPerHour: 4 }] },
  ];
  public loggedInUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(environment.baseUrl + 'login', { email, password })
      .pipe(
        switchMap((resp) => {
          localStorage.setItem('token', resp.token);
          return this.http.get<User>(environment.baseUrl + 'user/' + resp.user.id ).pipe(
            tap((user) => {
              this.loggedInUser.next(user);
              return user;
            })
          );
        })
      );
  }

  public logout() {
    this.loggedInUser = null;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public authenticate(): User {
    return this.loggedInUser.getValue();
  }

  public authenticateAsync(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedInUser.getValue());
      }, 100);
    });
  }
  getAdmin() {
    return this.users[0];
  }
}
