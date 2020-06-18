import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-modal',
  template: `
  <h2 mat-dialog-title><strong>Add New User</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-user></app-new-user>
  </mat-dialog-content>
  `
})
export class NewUserModalComponent implements OnInit {

  constructor() { }
  

  ngOnInit(): void {
    
  }

}
