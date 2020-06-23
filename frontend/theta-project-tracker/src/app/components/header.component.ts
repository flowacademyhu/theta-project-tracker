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
  <mat-sidenav #sidenav class="sidenav" mode="over">
    <mat-toolbar color="primary" role="heading">
      <mat-toolbar-row>
        <a routerLink="/timesheet" #navBarPic>
        <img width="1136" height="378"
        src="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png"
        alt="Voodoo Park"
          srcset="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png 1136w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-300x100.png 300w,
            https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-768x256.png 768w,
            https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-1024x341.png 1024w"
            sizes="(max-width: 1136px) 100vw, 1136px">
          </a>
        </mat-toolbar-row>
      </mat-toolbar>
      <mat-nav-list >
        <span>
          <a mat-raised-button color="primary" routerLink='/users' routerLinkActive='router-link-active' appHighlight>User</a>
          <br>
          <a mat-raised-button color="primary" routerLink='/reports' routerLinkActive='router-link-active' appHighlight>Reports</a>
          <br>
          <a mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Calendar</a>
          <br>
          <a mat-raised-button color="primary" routerLink='/projects' routerLinkActive='router-link-active' appHighlight>Projects</a>
          <br>
          <a mat-raised-button color="primary" routerLink='/milestones' routerLinkActive='router-link-active' appHighlight>Milestones</a>
          <br>
          <a mat-raised-button color="primary" routerLink='/clients' routerLinkActive='router-link-active' appHighlight>Clients</a>
        </span>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content #sidenavContent>
    <mat-toolbar color="primary">

      <a
      appSidenavHover
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
  </mat-toolbar>
    <!-- Add Content Here -->
  </mat-sidenav-content>
</mat-sidenav-container>
    `,
  styles: [`


  .sidenav-container {
    height: 100%;
  }
  .sidenav {
    width: 200px;
    background: #222;
    opacity: 0.4;
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

  #img {
    display: flex;
    justify-content: flex-start;
  }

  span a{
    font-style: bold;

  }
  .mat-toolbar.mat-primary {
  position: top;
  top: 0;
  z-index: 1;
  background: #222;
  color: #f0ead6;
  font: 18px  Roboto, "Helvetica Neue", 'Aerial';
  font-size: 20;
  }`],

})
export class HeaderComponent implements OnInit {

  timedOutCloser;

  constructor(private authService: AuthService, private router: Router) { }

  mouseEnter(trigger) {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    trigger.openMenu();
  }

  mouseLeave(trigger) {
    this.timedOutCloser = setTimeout(() => {
      trigger.closeMenu();
    }, 50);
  }

  ngOnInit() {
  }



  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
