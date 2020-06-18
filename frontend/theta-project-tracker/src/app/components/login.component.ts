import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
<mat-card class="login">
<div *ngIf="!user" class="card text-center">
  <mat-card-header>
      <mat-card-title>Login</mat-card-title>
    </mat-card-header>
    <mat-card-actions>
      <button mat-button color="primary" (click)="signInWithGoogle()">Sign in with Google</button>
    </mat-card-actions>
</div>
</mat-card>
  `,
  styles: [``]
})
export class LoginComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: SocialAuthService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['timesheet']);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

}
