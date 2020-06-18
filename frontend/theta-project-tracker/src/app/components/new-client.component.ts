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
  <button class="second" (click)="onCloseDialog()" mat-raised-button 
  [mat-dialog-close]="true" color="warn"
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
export class NewClientComponent implements OnInit {
  @Input() clientToEdit: Client;
  createdClient: Client;
  newClientForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });
  constructor(private clientService: ClientService) { }
  ngOnInit(): void {
    if (this.clientToEdit) {
      this.newClientForm.get('name').patchValue(this.clientToEdit.name);
      this.newClientForm.get('description').patchValue(this.clientToEdit.description);
    }
  }
  onCloseDialog() {
    if (this.clientToEdit) {
      this.createdClient = this.newClientForm.getRawValue();
      this.createdClient.id = this.clientToEdit.id;
      this.clientService.updateClient(this.clientToEdit.id, this.createdClient);
    } else {
      this.createdClient = this.newClientForm.getRawValue();
      this.createdClient.id = this.clientService.clients$.getValue().length + 1;
      this.clientService.addClient(this.createdClient);
    }
  }
}
