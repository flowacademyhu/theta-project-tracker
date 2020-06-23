import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/internal/operators/map';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  template: `
<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #sidenav class="sidenav" mode="over" (mouseleave)="sidenav.close()">
    <mat-nav-list>
      <span>
        <a routerLink='/users' routerLinkActive='router-link-active' appHighlight>User</a>
        <br>
        <a routerLink='/reports' routerLinkActive='router-link-active' appHighlight>Reports</a>
          <br>
          <a routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Calendar</a>
          <br>
          <a routerLink='/projects' routerLinkActive='router-link-active' appHighlight>Projects</a>
          <br>
          <a routerLink='/milestones' routerLinkActive='router-link-active' appHighlight>Milestones</a>
          <br>
          <a routerLink='/clients' routerLinkActive='router-link-active' appHighlight>Clients</a>
        </span>
      </mat-nav-list>
    </mat-sidenav>
  <mat-sidenav-content class="sidenav-content">
    <span>
      <mat-toolbar color="primary">
        <a
          class="img"
          (mouseenter)="sidenav.toggle()"
          aria-label="Toggle sidenav"
          mat-icon-button
          routerLink="/timesheet" #toolBarPic>
          <img width="1136" height="378"
          src="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png"
          alt="Voodoo Park"
          srcset="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png 1136w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-300x100.png 300w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-768x256.png 768w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-1024x341.png 1024w"
          sizes="(max-width: 1136px) 100vw, 1136px">
        </a>
      <span #logOut routerLink='/login' routerLinkActive='router-link-active' appHighlight>
        <p>Logout</p>
      </span>
    </mat-toolbar>
  </span>
  </mat-sidenav-content>
</mat-sidenav-container>
    `,
  styles: [`

.sidenav-container {
  height: 100%;
}
.sidenav  {
  position: absolute;
  display: flex;
  width: 200px;
  background: #222;
  opacity: 0.6;
  color: #f0ead6;
  font: 18px  Roboto, "Helvetica Neue", 'Aerial';
  font-size: 20;
  align: center;
  }
  img {
  line-height: 1.5;
  font-family: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: normal;
  color: inherit;
  box-sizing: border-box;
  hyphens: none;
  border: 0;
  width: auto;
  height: auto;
  display: block;
  float: left;
  margin: 0;
  margin-right: .75em;
  position: relative;
  max-width: 250px;
  max-height: 50px;
  margin-bottom: 0;
  opacity: 1;
  color: #fff;
}
.img {
    display: flex;
    justify-content: flex-start;
  }
  .mat-toolbar.mat-primary {
  width: 100%;
  position: top;
  top: 0;
  background: #222;
  }`],

})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }



  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
