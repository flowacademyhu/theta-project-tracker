import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" role="heading">
      <mat-toolbar-row>
        <span [routerLink]="['/timesheet']" routerLinkActive="router-link-active" >
        <button mat-raised-button color="primary">Timesheet</button>
    </span>
        <span [routerLink]="['/users']" routerLinkActive="router-link-active" id="User" >User</span>
        <span [routerLink]="['/reports']" routerLinkActive="router-link-active" id="Reports">Reports</span>
        <span [routerLink]="['/calendar']" routerLinkActive="router-link-active" id="Calendar">Calendar</span>
        <span></span>
        <span></span>
        <span [routerLink]="['/login']" routerLinkActive="router-link-active" id="logOut">Log Out</span>
      </mat-toolbar-row>
    </mat-toolbar>
    `,
  styles: [`

  button {
  display: flex;
  justify-content: center;
  font-size: large;
  background: #007bff;
  }
  #User #Reports #Calendar {
    display: flex;
    flex: 2 6 auto;
    justify-content: flex-start, space-evenly;

  }
  #logOut {
    display: flex;
    flex: 2 6 auto;
    justify-content: flex-end, space-evenly;
  }
  .mat-toolbar.mat-primary {
  background: #007bff;
  color: #fff;
  }`],

})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}



  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
