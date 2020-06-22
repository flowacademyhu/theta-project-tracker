
import { Component, OnInit, Inject } from '@angular/core';
import { Milestone } from '../models/milestone.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-milestone-modal',
  template: `
  <h2 mat-dialog-title><strong>Add New Milestone</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-milestone [milestoneToEdit]="milestoneToEdit"></app-new-milestone>
  </mat-dialog-content>
  `
})
export class NewMilestoneModalComponent implements OnInit {

  milestoneToEdit: Milestone;
  message = "Add New Milestone";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    if (data !== null) {
      this.milestoneToEdit = data.milestoneToEdit;
    }
  }

  ngOnInit(): void {
    if (this.milestoneToEdit) {
      this.message = "Edit Milestone";
    }
  }
}
