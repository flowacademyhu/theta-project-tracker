import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <form>
    <label>Email</label>
    <input name="email" [(ngModel)]="email">
    <label>Password</label>
    <input  name="passw" [(ngModel)]="passw">
    <button (click)="auth(email, passw)">LogIn</button>
    </form>
    `
})

export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router,
    private http: HttpClient, private route: ActivatedRoute) { }
  email: string;
  passw: string;
  users: User[] = [];
  ngOnInit() {
    localStorage.setItem('accesToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5MjUwNTEzOH0.7_1yAElpeQdIQejFUuN8iQM_-GX2pImFZSsoF8hgs7E')
    this.route.data.subscribe(data => {
      this.users = data.users;
    })
  }
  auth(email: string, passw: string) {

    let cica = this.http.post('http://localhost/3000/login', { email, passw });
    console.log(cica);
    this.router.navigate(['..', 'users'])
  }
}