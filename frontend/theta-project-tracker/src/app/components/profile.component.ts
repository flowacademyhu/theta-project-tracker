import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  template: `
  <div class="wrapper">
  <div *ngIf="warn"><p>{{ 'pwd-dont-match' | translate }}</p></div>
  <mat-accordion>
    <mat-expansion-panel [expanded]="emailPanelState">
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{ 'email-change' | translate }}
        </mat-panel-title>
      </mat-expansion-panel-header>
      <form [formGroup]="changeEmail">
        <label>{{'new-email' | translate }}</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="newEmail">
          </mat-form-field>
        </div>
        <label>{{ 'password' | translate }}</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="password" type="password">
          </mat-form-field>
        </div>
        <button mat-raised-button (click)="onSaveNewEmail()" color="primary"
        [disabled]="changeEmail.invalid"
        >{{ 'save' | translate }}</button>
      </form>
    </mat-expansion-panel>
    <mat-expansion-panel [expanded]="panelOpenState">
      <mat-expansion-panel-header>
        <mat-panel-title>
          {{ 'pwd-change' | translate }}
        </mat-panel-title>
      </mat-expansion-panel-header>
      <form [formGroup]="changePassword">
        <label>{{ 'new-pwd' | translate }}</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="newPassword" type="password">
          </mat-form-field>
        </div>
        <label>{{ 'confirm-pwd' | translate }}</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="passwordAgain" type="password">
          </mat-form-field>
        </div>
        <label>{{ 'old-pwd' | translate }}</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="password" type="password">
          </mat-form-field>
        </div>
        <button mat-raised-button (click)="onSaveNewPassword()" color="primary"
        [disabled]="changePassword.invalid"
        type="button"
        >{{ 'save' | translate }}</button>
      </form>
    </mat-expansion-panel>
  </mat-accordion>
</div>
  `,
  styles: [`
  .wrapper {
    margin: auto;
    width: 30%;
    height: 30%;
    padding: 200px;
  }
  form {
    margin-top: 30px;
  }
  p {
    color: red;
    margin-left: 235px;
  }
  .full-width {
    width: 200px;
  }
  `]
})

export class ProfileComponent implements OnInit {

  changePassword = new FormGroup({
    newPassword: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]'), Validators.minLength(5)]),
    passwordAgain: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]'), Validators.minLength(5)]),
    password: new FormControl(null, Validators.required)
  });
  changeEmail = new FormGroup({
    newEmail: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  warn: boolean;
  panelOpenState: boolean;
  emailPanelState: boolean;
  constructor(private userService: UserService) { }
  ngOnInit() { }
  onSaveNewPassword() {
    if (this.changePassword.get('newPassword').value === this.changePassword.get('passwordAgain').value) {
      let change = {
        password: this.changePassword.get('password').value,
        newPassword: this.changePassword.get('newPassword').value
      }
      this.userService.updatePassword(change).subscribe(() => {
        this.panelOpenState = false;
        this.changePassword.reset();
      },
      (error: HttpErrorResponse) => {
      console.log(error.error);
      this.panelOpenState = true;
      this.warn = true;
    });
    } else {
      this.warn = true;
      setTimeout(() => {
        this.warn = false;
      }, 2000);
    }
  }
  onSaveNewEmail() {
    this.userService.updateEmail(this.changeEmail.getRawValue()).subscribe(() => {
      this.emailPanelState = false;
      this.changeEmail.reset();
      for (let control in this.changeEmail.controls) {
        this.changeEmail.controls[control].setErrors(null);
     }
    },
    (error: HttpErrorResponse) => {
      console.log(error.error);
      this.emailPanelState = true;
      this.warn = true;
      setTimeout(() => {
        this.warn = false;
      }, 2000);
    });

  }
}