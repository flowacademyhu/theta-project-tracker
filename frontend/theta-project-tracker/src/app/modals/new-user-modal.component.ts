import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-user-modal',
  template: `
  <h2 mat-dialog-title><strong>{{ message }}</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-user [userToEdit]="userToEdit"></app-new-user>
  </mat-dialog-content>
  `
})
export class NewUserModalComponent implements OnInit {
  message = "Add New User";
  userToEdit: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      this.userToEdit = data.userToEdit;
    }
  }
  ngOnInit(): void {
    if (this.userToEdit) {
      this.message = "Edit User";
    }
  }

}
