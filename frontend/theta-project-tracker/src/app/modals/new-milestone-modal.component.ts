import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-milestone-modal',
  template: `
  <h2 mat-dialog-title><strong>Add New Milestone</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-milestone></app-new-milestone>
  </mat-dialog-content>
  `
})
export class NewMilestoneModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
