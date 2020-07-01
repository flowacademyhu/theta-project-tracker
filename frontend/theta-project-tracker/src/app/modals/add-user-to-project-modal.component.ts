import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user-to-project-modal',
  template:`
  <form [formGroup]="newUser">
  <h2 mat-dialog-title><strong>Add New User</strong></h2>
  <mat-dialog-content class="mat-typography">
  <label for="name">Name</label>
  <div>
  <mat-form-field [formGroup]="newUser">
    <mat-select class="full-width" formControlName="user">
      <mat-option *ngFor="let user of users" [value]="user">{{ user }}</mat-option>
    </mat-select>
    </mat-form-field>
  </div>
  </mat-dialog-content>
  <div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">Cancel</button>
  <button (click)="onAddNewUser()" mat-raised-button [mat-dialog-close]="availableUsers" color="warn">Add</button>
</div>
</form>
  `,
  styles: [`
  .full-width {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }
  `]
 })

export class AddUserToProjectModalComponent implements OnInit { 

  constructor(private userService: UserService ) {}
  subscriptions$: Subscription[] = [];
  availableUsers: User[];
  users: string[] = [];
  @Input() userToEdit: User;
  newUser = new FormGroup({
    user: new FormControl(null)
  })  

  ngOnInit(): void {
    this.subscriptions$.push(this.userService.fetchUsers().subscribe(users => {
      this.availableUsers = users;
      this.users = this.availableUsers.map(u => u.firstName + ' ' + u.lastName);
    }));
  }

  onAddNewUser() {
    let chosen = this.availableUsers.find(u  => u.firstName + ' ' + u.lastName === this.newUser.get('user').value)
  /*   this.userService.updateUser(this.userToEdit.id, this.newUser.getRawValue()).subscribe(); */
  }
}