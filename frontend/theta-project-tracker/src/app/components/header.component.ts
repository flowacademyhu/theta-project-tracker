import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" routerLink="/">Heroes & Villains</a>
        </div>
        <ul class="nav navbar-nav">
          <li routerLinkActive="active">
            <a routerLink="characters">Timesheet</a>
          </li>
          <li routerLinkActive="active">
            <a [routerLink]="['characters', 'new']">Users</a>
          </li>
          <li routerLinkActive="active">
            <a [routerLink]="['characters', 'new']">Reports</a>
          </li>
          <li routerLinkActive="active">
            <a [routerLink]="['characters', 'new']">Calendar</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a (click)="onLogout()">Logged in as: Test Elek (LOGOUT)</a></li>
        </ul>
      </div>
    </nav>
  `
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
