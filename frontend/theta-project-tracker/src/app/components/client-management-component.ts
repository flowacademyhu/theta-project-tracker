import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-client',
  template: `
  <form [formGroup]="newClientForm">
  <label>Name</label>
  <div>
      <mat-form-field class="full-width">
          <input matInput type="text" formControlName="name">
      </mat-form-field>
  </div>
  <label>Description</label>
  <div>
      <mat-form-field class="full-width">
          <textarea matInput formControlName="description"></textarea>
      </mat-form-field>
  </div>
</form>
<div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">Cancel</button>
  <button class="second" (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="true" color="warn"
      [disabled]="newClientForm.invalid">Save</button>
</div>
  `,
  styles: [`
  .actions {
    margin-top: 60px;
  }
  .full-width {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }
  mat-icon:hover {
    cursor: pointer;
  }
  .second {
    margin-left: 5px;
  }
  `]
})
export class ClientManagementComponent implements OnInit {
  @Input() clientToEdit: Client;
  createdClient: Client;
  newClientForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]),
    description: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')])
  });
  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
    if (this.clientToEdit) {
      this.newClientForm.patchValue(this.clientToEdit);
    }
  }
  onCloseDialog() {
    if (this.clientToEdit) {
      this.clientService.updateClient(this.clientToEdit.id, this.newClientForm.getRawValue()).subscribe();
    } else {
      this.createdClient = this.newClientForm.getRawValue();
      this.clientService.addClient(this.createdClient).subscribe();
    }
  }
}
