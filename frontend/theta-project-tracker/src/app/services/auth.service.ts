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

  private apiUrl: string = environment.baseUrl;
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  
  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(this.apiUrl + 'login', { email, password })
      .pipe(
        switchMap((resp) => {
          localStorage.setItem('token', resp.token);
          return this.http.get<User>(this.apiUrl + 'user/profile').pipe(
            tap((user) => {
              this.loggedInUser$.next(user);
              return user;
            })
          );
        })
      );
  }
  public fetchCurrentUserOnApplication(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get<User>(this.apiUrl + 'user/profile').subscribe(
        (user) => {
          this.loggedInUser$.next(user);
          resolve();
        },
        () => {
          resolve();
        }
      );
    });
  }
  public logout() {
    this.loggedInUser$ = null;
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  public authenticate(): User {
    return this.loggedInUser$.getValue();
  }
  public authenticateAsync(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedInUser$.getValue());
      }, 100);
    });
  }
  get user(): Observable<User> {
    return this.loggedInUser$;
  }
}
