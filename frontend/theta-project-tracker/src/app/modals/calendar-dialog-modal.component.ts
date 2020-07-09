import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-calendar-modal',
  template: `
  <mat-dialog-content class="mat-typography">
    <form [formGroup]="hour">
      <mat-form-field>
        <input matInput formControlName="overTime">
      </mat-form-field>
    </form>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close color="accent" >Cancel</button>
      <button mat-raised-button [mat-dialog-close]="false" color="primary">Edit</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn">Delete</button>
    </mat-dialog-actions>
  </mat-dialog-content>
  `,
  styles: [`
  .mat-typography {
    opacity: 1;
    padding: 1rem;
    border-radius: 4px;
    box-sizing: border-box;
    outline: 0;
    overflow: hidden;
  }
  button {
    display: flex;
    font-size: 12;
    color:#f0ead6;
    align-items: center;
    border-radius: 0;
    opacity: 0.9;
    outline: 0;
    background: #222;
  }
}

    `]
})

export class CalendarModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog, public dialogRef: MatDialogRef<any>) { }

  @ViewChild('editOvertime') public editOvertime: ElementRef<any>;

  public hour = new FormGroup({
    overTime: new FormControl(),
  });

  ngOnInit(): void {
  }
}
