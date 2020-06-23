import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary" role="heading">
    <mat-toolbar-row>
    <span id="spanOne">
        <a
          class="img"
          (mouseenter)=onTrigger()
          (mouseleave)=onTrigger()
          aria-label="Toggle sidenav"
          mat-icon-button
          routerLink="/timesheet" id="toolBarPic">
          <img width="1136" height="378"
          src="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png"
          alt="Voodoo Park"
          srcset="https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1.png 1136w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-300x100.png 300w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-768x256.png 768w,
          https://voodoopark.com/wp-content/uploads/2019/10/cropped-vp-logo-white-with-pm-1-1024x341.png 1024w"
          sizes="(max-width: 1136px) 100vw, 1136px">
        </a>
      </span>
      <span id="spanTwo">
        <p>Loged in as:</p>
        <button mat-stroked-button [routerLink]="['/login']" routerLinkActive="router-link-active" id="logOut" appHighLight>Logout</button>
      </span>
  </mat-toolbar-row>
</mat-toolbar>
    `,
  styles: [`
  p, .mat-typhography p {
    font-size: 15px;
    margin:0;
    opacity: 0.8;
  }
.mat-toolbar.mat-primary {
  position: top;
  top: 0;
  background: #222;
  color: #f0ead6;
  font-size: 12;
  align-items: center;
}

img {
  display: flex;
  line-height: 1.5;
  font-family: inherit;
  font-size: 100%;
  font-style: inherit;
  font-weight: normal;
  color: inherit;
  box-sizing: border-box;
  hyphens: none;
  width: auto;
  height: 2.5rem;
  display: block;
  float: left;
  margin: auto;
  margin-right: 1em;
  position: relative;
  max-width: 250px;
  max-height: 50px;
  margin-bottom: 0.75em;
  opacity: 1;
}
#spanOne {
  display: flex;
  flex:1 1 auto;
  justify-content: flex-start;

}
#spanTwo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 12;
}
button {
display: flex;
font-size: 12;
border: none;
color:#f0ead6;
opacity: 0.9;
outline: 0;
}

#logOut {
  align-items: center;
  background: transparent;
  border: none
}`],
})

export class HeaderComponent implements OnInit {

  @Output() public sidenavTriggerd: EventEmitter< any > = new EventEmitter< any >();

  public onTrigger() {
    this.sidenavTriggerd.emit();
  }


  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }



  public onLogout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
