import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User, Role } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal.component';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary" role="heading" >
      <mat-toolbar-row>
        <span id="spanOne">
          <a
            class="img"
            (mouseenter)=onTrigger()
            (mouseleave)=onTrigger()
            aria-label="Toggle sidenav"
            mat-icon-button
            routerLink="/timesheet" id="toolBarPic">
            <img width="1136" height="378" [ngStyle]="{ 'cursor': (user$ | async ) ? 'pointer':'default' }"
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
        <ng-container *ngIf="user$ | async">
          <p>{{'logged-in-as' | translate}}</p>
          <p routerLink="/profile">{{ (user$ | async).firstName }}</p>
          <button mat-stroked-button (click)="onOpenConfirmModal()"  id="logOut" appHighLight>{{'logout' | translate}}</button>
          </ng-container>
        </span>
      </mat-toolbar-row>
    </mat-toolbar>`,
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
      opacity: 1;
    }
    #spanOne {
      display: flex;
      flex:1 1 auto;
      justify-content: flex-start;
      align-items: center;
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
    color:#f0ead6;
    border-radius: 0;
    opacity: 0.9;
    outline: 0;
    }
    .mat-icon-button {
    padding: 0.7rem;
    min-width: 0;
    width: 140px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 0%;
    }
    #logOut {
      align-items: center;
      background: transparent;
      border: none
}`],
})

export class HeaderComponent implements OnInit {

  @Output() public sidenavTriggerd: EventEmitter<void> = new EventEmitter<void>();
  user$: Observable<User> = this.authService.user;
  userRole: Role;
  public onTrigger() {
    if (localStorage.getItem('token') && this.userRole === 'admin') {
      this.sidenavTriggerd.emit();
    }
  }

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.authService.user.subscribe(u => {
      if (u) {
        this.userRole = u.role;
      }
    })
  }

  onOpenConfirmModal() {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '15%',
      height: '15%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
      }
    });
  }
}