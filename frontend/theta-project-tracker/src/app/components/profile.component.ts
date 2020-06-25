import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  template: `
  <div class="wrapper">
  <mat-accordion>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Change Email
        </mat-panel-title>
      </mat-expansion-panel-header>
      <form [formGroup]="changeEmail">
        <label>New Email</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="email">
          </mat-form-field>
        </div>
        <label>Password</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="password" type="password">
          </mat-form-field>
        </div>
        <button mat-raised-button (click)="onSaveNewEmail()" color="warn">Save</button>
      </form>
    </mat-expansion-panel>
    <mat-expansion-panel>
      <mat-expansion-panel-header>
        <mat-panel-title>
          Change Password
        </mat-panel-title>
      </mat-expansion-panel-header>
      <form [formGroup]="changePassword">
        <label>New Password</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="password" type="password">
          </mat-form-field>
        </div>
        <label>Confirm New Password</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="passwordAgain" type="password">
          </mat-form-field>
        </div>
        <label>Old Password</label>
        <div>
          <mat-form-field>
            <input matInput formControlName="oldPassword" type="password">
          </mat-form-field>
        </div>
        <button mat-raised-button (click)="onSaveNewPassword()" color="warn">Save</button>
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
  }
  form {
    margin-top: 30px;
  }
  .full-width {
    width: 200px;
  }
  `]
})

export class ProfileComponent implements OnInit {
  constructor() { }
  changePassword = new FormGroup({
    password: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]),
    passwordAgain: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]),
    oldPassword: new FormControl(null, Validators.required)
  });
  changeEmail = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  onSaveNewPassword() {
    if (this.changePassword.get('password').value === this.changePassword.get('passwordAgain').value) {
      console.log(this.changePassword.getRawValue())
    } else {
      console.log('nope')
    }
  }
  onSaveNewEmail() {
    console.log(this.changeEmail.get('email'))
  }
  ngOnInit() { }
}