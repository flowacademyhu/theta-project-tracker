import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm">
          <h2>Login</h2>
          <div class="panel panel-default">
          <mat-form-field class="full-width-input">
              <label for="email">Email</label>
              <input matInput
                type="text"
                id="email"
                class="form-control"
                formControlName="email"
                required
              />
          </mat-form-field>
          <span class="help-block" *ngIf="loginForm.get('email').invalid && loginForm.get('email').touched">Email is required.</span>
          <mat-form-field class="full-width-input">
              <label for="password">Password</label>
              <input matInput
                type="text"
                class="form-control"
                id="password"
                formControlName="password"
                required
              />
              </mat-form-field>
              <span class="help-block" *ngIf="loginForm.get('password').invalid && loginForm.get('password').touched">Password is required.</span>
            <button class="btn btn-primary" type="submit" (click)="onLogin()" [disabled]="loginForm.invalid">
              Login
            </button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
  mat-card {
    max-width: 400px;
    margin: 2em auto;
    text-align: center;
  }
  mat-form-field {
    display: block;
  }
    `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe(u => {
      this.user = u;
    });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onLogin() {
    console.log(this.user);
    console.log(this.loginForm.get('email').value);
    this.authService
      .login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .then(() => {
        this.router.navigate(['timesheet']);
      })
      .catch(() => {
        console.log('wrong email or password');
      });
  }
}
