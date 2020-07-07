import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-calendar-modal',
  template: `
    <mat-dialog-content class="mat-typography">
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-raised-button mat-dialog-close color="accent">Cancel</button>
      <button mat-raised-button mat-dialog-close color="accent">Edit</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn" >Delete</button>
    </mat-dialog-actions>
  `,
  styles: [`
  .right {
    margin-left: 10px;
  }
    `]
})

export class CalendarModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }
  ngOnInit(): void {
  }
}
