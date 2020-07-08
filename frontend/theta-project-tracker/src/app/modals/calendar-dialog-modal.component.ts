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
      <button mat-raised-button mat-dialog-close color="accent">Cancel</button>
      <button mat-raised-button [mat-dialog-close]="false" color="basic">Edit</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn">Delete</button>
    </mat-dialog-actions>
  </mat-dialog-content>
  `,
  styles: [`
  .right {
    margin-left: 10px;
  }
  .mat-dialog-content {
    border-radius: 4px;
box-sizing: border-box;
overflow-x: hidden;
overflow-y: hidden !important;
outline: 0;
width: 500px;
height: 250px;
min-height: inherit;
max-height: inherit;
  }
    `]
})

export class CalendarModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialog: MatDialog,  public dialogRef: MatDialogRef<any> ) { }

  editBool: boolean;
  deleteBool: boolean;

  @ViewChild('editOvertime') public editOvertime: ElementRef<any>;

  public hour = new FormGroup({
    overTime: new FormControl(),
  });

  ngOnInit(): void {
  }
}
