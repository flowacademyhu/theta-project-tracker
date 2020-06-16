import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
    <div class="panel panel-default">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          [(ngModel)]="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="text"
          class="form-control"
          id="password"
          [(ngModel)]="password"
        />
      </div>
      <button class="btn btn-primary" type="submit" (click)="onLogin()">
        Login
      </button>
    </div>
    <h4>Login Page Example with Angular Material </h4>
  <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
  <div class="example-container">
    <mat-form-field>
      <input matInput placeholder="Email" formControlName="email">
    </mat-form-field>

    <mat-form-field>
      <input matInput type="password" placeholder="Password" formControlName="password">
    </mat-form-field>

    <button [disabled]="!loginForm.valid" mat-raised-button color="primary" mat-button>Sign In</button>
  </div>
</form>
  `,
  styles: [
    `
      .panel {
        padding: 1rem;
        margin-left: auto;
        margin-right: auto;
        width: 40%;
        margin-top: 10%;
      }
      h4, p {
        font-family: Lato;
      }

      .example-container {
        display: flex;
        flex-direction: column;
      }

      .example-container > * {
        width: 100%;
      }
    `
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void { }

  public onLogin() {
    this.authService
      .login(this.email)
      .then(() => {
        this.router.navigate(['timesheet']);
      })
      .catch(() => {
        console.log('invalid email');
      });
  }
}
