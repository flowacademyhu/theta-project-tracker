import { Component, OnInit, Inject } from '@angular/core';
import { ActionLabel } from '../models/action-label.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-action-label-modal',
  template: `
  <h2 mat-dialog-title><strong>{{message}}</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-action-label [actionLabelToEdit]="actionlabelToEdit"></app-new-action-label>
  </mat-dialog-content>
  `
})
export class NewActionLabelModalComponent implements OnInit {

  actionlabelToEdit: ActionLabel;
  message = "Add New Action Label";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    if (data) {
      this.actionlabelToEdit = data.actionLabelToEdit;
    } }

    ngOnInit(): void {
      if (this.actionlabelToEdit) {
        this.message = "Edit Action Label";
      }
    }

}
