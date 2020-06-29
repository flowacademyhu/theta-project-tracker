import { User } from './../models/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
      <mat-card-content>
        <form [formGroup]="loginForm">
          <h2>{{'login' | translate}}</h2>
          <div class="panel panel-default">
          <mat-form-field class="full-width-input">
              <label for="email">{{'email' | translate}}</label>
              <input matInput
                type="text"
                id="email"
                class="form-control"
                formControlName="email"
                required
              />
          </mat-form-field>
          <span class="help-block" *ngIf="loginForm.get('email').invalid && loginForm.get('email').touched">{{'email-required' | translate}}</span>
          <mat-form-field class="full-width-input">
              <label for="password">{{'password' | translate}}</label>
              <input matInput
                type="password"
                class="form-control"
                id="password"
                formControlName="password"
                required
              />
              </mat-form-field>
              <span class="help-block" *ngIf="loginForm.get('password').invalid && loginForm.get('password').touched">{{'password-required' | translate}}</span>
            <button mat-raised-button type="submit" (click)="onLogin()" [disabled]="loginForm.invalid">
              {{'login' | translate}}
            </button>
          </div>
        </form>
        <div class="alert alert-danger" *ngIf="errors">
        <p *ngFor="let error of errors">{{ error }}</p>
      </div>
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
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  user: User;
  errors: string[];
  subscriptions$: Subscription[] = [];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.authService.user.subscribe(u => {
    //   this.user = u;
    // });
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  public onLogin() {
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(
      () => {
        this.router.navigate(['timesheet']);
       },
      (error: HttpErrorResponse) => {
        this.errors = error.error.message;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
