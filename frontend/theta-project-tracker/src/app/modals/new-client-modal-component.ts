import { Component, OnInit, Inject } from '@angular/core';
import { Client } from '../models/client.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-client-modal',
  template: `
    <h2 mat-dialog-title><strong>{{ message }}</strong></h2>
    <mat-dialog-content class="mat-typography">
      <app-new-client [clientToEdit]="clientToEdit"></app-new-client>
    </mat-dialog-content>
    `,
})

export class NewClientModalComponent implements OnInit {
  message = "Add New Client"
  clientToEdit: Client;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data !== null) {
      this.clientToEdit = data.clientToEdit;
    }
  }
  ngOnInit(): void {
    if (this.clientToEdit) {
      this.message = "Edit Client";
    }
  }
}