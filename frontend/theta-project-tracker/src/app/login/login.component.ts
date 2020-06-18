import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  template: `
  <!-- <div class="jumbotron bg-transparent text-center">
  <div *ngIf="!user" class="card text-center">
    <h6 class="card-header">
      Login
    </h6>
    <div class="card-block">
      <h4 class="card-title">Not signed in</h4>
      <p class="card-text">Sign in with</p>
    </div>
    <div class="card-block">
      <button class="btn btn-social-icon btn-google mx-1" (click)="signInWithGoogle()"><span class="fa fa-google"></span></button>
    </div>
  </div>
  <div *ngIf="user" class="card text-center">
    <h6 class="card-header">
      Login
    </h6>
    <div class="card-block"></div>
    <img *ngIf="user.photoUrl" class="card-img-top img-responsive photo" src="{{ user.photoUrl }}">
    <div class="card-block">
      <h4 class="card-title">{{ user.name }}</h4>
      <p class="card-text">{{ user.email }}</p>
    </div>
    <div class="card-block">
      <button class="btn btn-danger" (click)="signOut()">Sign out</button>
    </div>
  </div>
</div> -->

<mat-card class="login">
<div *ngIf="!user" class="card text-center">
  <mat-card-header>
      <mat-card-title>Login</mat-card-title>
      <mat-card-subtitle>Sing in with Google</mat-card-subtitle>
    </mat-card-header>
    <mat-card-actions>
      <button mat-button (click)="signInWithGoogle()">Sign in with Google</button>
    </mat-card-actions>
</div>
<div *ngIf="user" class="card text-center">
<mat-card-header>
      <mat-card-title>Login</mat-card-title>
      <mat-card-subtitle>Sing in with Google</mat-card-subtitle>
    </mat-card-header>
    <mat-card-actions>
      <button mat-button (click)="signOut()">Sign in with Google</button>
    </mat-card-actions>
</div>

</mat-card>
  `,
  styles: [``]
})
export class LoginComponent implements OnInit {

  user: SocialUser;

  constructor(private authService: SocialAuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

}
