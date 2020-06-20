import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `
  <!-- <form>
   <mat-form-field>
      <input matInput type="password" placeholder="Password" formControlName="password">
    </mat-form-field>
    <button [disabled]="!loginForm.valid" mat-raised-button color="primary" mat-button>Sign In</button>
</form> -->
<form [formGroup]="loginForm">
    <div class="panel panel-default">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          id="email"
          class="form-control"
          formControlName="email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="text"
          class="form-control"
          id="password"
          formControlName="password"
        />
      </div>
      <button class="btn btn-primary" type="submit" (click)="onLogin()">
        Login
      </button>
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
      /* h4, p {
        font-family: Lato;
      }

      .example-container {
        display: flex;
        flex-direction: column;
      }

      .example-container > * {
        width: 100%;
      } */
    `
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;


  constructor(private authService: AuthService, private router: Router) {
  }
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
    console.log(this.loginForm.get("email").value);
    this.authService
      .login(this.loginForm.get('email').value)
      .then(() => {
        this.router.navigate(['timesheet']);
      })
      .catch(() => {
        console.log('invalid email');
      });
  }
}
