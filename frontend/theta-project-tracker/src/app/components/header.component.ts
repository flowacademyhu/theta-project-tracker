import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" role="heading">
      <mat-toolbar-row>
        <span id="img">
          <button mat-raised-button color="primary" routerLink='/timesheet' routerLinkActive='router-link-active' appHighlight>
          <img width="1136" height="378"
            src="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png"
            class="custom-logo"
            alt="Voodoo Park"
            srcset="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png 1136w, https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-300x100.png 300w, https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-768x256.png 768w, https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-1024x341.png 1024w"
            sizes="(max-width: 1136px) 100vw, 1136px">
          </button>
        </span>
        <span id="spanOne">
          <button mat-raised-button color="primary" routerLink='/users' routerLinkActive='router-link-active' appHighlight>User</button>
          <button mat-raised-button color="primary" routerLink='/reports' routerLinkActive='router-link-active' appHighlight>Reports</button>
          <button mat-raised-button color="primary" routerLink='/calendar' routerLinkActive='router-link-active' appHighlight>Calendar</button>
          <button mat-raised-button color="primary" routerLink='/projects' routerLinkActive='router-link-active' appHighlight>Projects</button>
          <button mat-raised-button color="primary" routerLink='/milestones' routerLinkActive='router-link-active' appHighlight>Milestones</button>
          <button mat-raised-button color="primary" routerLink='/clients' routerLinkActive='router-link-active' appHighlight>Clients</button>
        </span>
        <span id="spanTwo">
          <p>Loged in as:</p>
          <button mat-raised-button color="primary" [routerLink]="['/login']" routerLinkActive="router-link-active" id="logOut" appHighlight>Logout</button>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>
    `,
  styles: [`
  span p {
    display: flex;
    margin: inherit;
    align-items: center;
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
  span {
    display: flex;
    justify-content: space-evenly;
  }
  #img {
    display: flex;
    justify-content: flex-start;
  }
  #spanOne {
    display: flex;
    flex:1 1 auto;
    flex-wrap: nowrap;
    justify-content: center;
  }
  #spanTwo {
    display: flex;
    justify-content: flex-end;
  }
  button {
  display: flex;
  font-size: large;
  border: none;
  color:#f0ead6;
  opacity: 0.9;
  outline: 0;

  }
  #logOut {
    align-items: center;
  }
  .mat-toolbar.mat-primary {
  background: #222;
  color: #f0ead6;
  font: 18px  Roboto, "Helvetica Neue", 'Aerial';
  font-size: 20;
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
