import { LoginComponent } from './login.component';
import { User } from './../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" role="heading">
      <mat-toolbar-row>
        <span id="spanOne">
        <button mat-raised-button color="primary" routerLink='/timesheet' routerLinkActive='router-link-active' appHighlight>Timesheet</button>

        <button mat-raised-button color="primary" routerLink='/user' routerLinkActive='router-link-active' appHighlight>User</button>
        <button mat-raised-button color="primary" routerLink='/reports' routerLinkActive='router-link-active' appHighlight>Reports</button>
        <button mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Calendar</button>
        <button mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Projects</button>
        <button mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Milestones</button>
        <button mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Clients</button>
        </span>
        <span id="spanTwo">
        <p>Loged in as:</p>
        <button mat-raised-button color="primary" [routerLink]="['/login']" routerLinkActive="router-link-active" id="logOut" appHighlight>Logout</button>
        </span>

        <!-- <span [routerLink]="['/users']" routerLinkActive="router-link-active" id="User" >User</span>
        <span [routerLink]="['/reports']" routerLinkActive="router-link-active" id="Reports">Reports</span>
        <span [routerLink]="['/calendar']" routerLinkActive="router-link-active" id="Calendar">Calendar</span> -->

      </mat-toolbar-row>
    </mat-toolbar>
    `,
  styles: [`
  mat-mat-toolbar-row {
    display: flex;
    justify-content: space-between;
  }

  span {
    display: flex;
    flex:1 1 auto;
    flex-wrap: nowrap
  }
  #spanTwo {
    display: flex;
    justify-content: flex-end;
  }


  button {
  display: flex;
  font-size: large;
  background: transparent;
  border: transparent;
  }
  #User #Reports #Calendar {
    display: flex;
    justify-content: flex-start

  }
  #logOut {
    align-items: center;
  }
  .mat-toolbar.mat-primary {
  background: #007bff;
  color: #fff;
  }`],

})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    LoginComponent.user.value();
  }



  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
