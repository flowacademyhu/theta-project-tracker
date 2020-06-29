import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-client',
  template: `
  <form [formGroup]="newClientForm">
  <label>{{'name' | translate}}</label>
  <div>
      <mat-form-field class="full-width">
          <input matInput type="text" formControlName="name">
      </mat-form-field>
  </div>
  <label>{{'description' | translate}}</label>
  <div>
      <mat-form-field class="full-width">
          <textarea matInput formControlName="description"></textarea>
      </mat-form-field>
  </div>
</form>
<div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button class="second" (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="true" color="warn"
      [disabled]="newClientForm.invalid">{{'save' | translate}}</button>
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
export class ClientManagementComponent implements OnInit, OnDestroy {
  @Input() clientToEdit: Client;
  createdClient: Client;
  subscriptions$: Subscription[] = [];
  newClientForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
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
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
