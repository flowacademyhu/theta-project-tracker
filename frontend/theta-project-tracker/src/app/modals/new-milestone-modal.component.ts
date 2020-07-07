
import { Component, OnInit, Inject } from '@angular/core';
import { Milestone } from '../models/milestone.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-milestone-modal',
  template: `
  <h2 mat-dialog-title><strong>{{message}}</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-milestone [milestoneToEdit]="milestoneToEdit"></app-new-milestone>
  </mat-dialog-content>
  `,
  styles: [`
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `]
})
export class NewMilestoneModalComponent implements OnInit {

  milestoneToEdit: Milestone;
  message = "Add New Milestone";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    if (data) {
      this.milestoneToEdit = data.milestoneToEdit;
    }
  }

  ngOnInit(): void {
    if (this.milestoneToEdit) {
      this.message = "Edit Milestone";
    }
  }
}
