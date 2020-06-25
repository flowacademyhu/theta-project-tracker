import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  template: `
    <h2 mat-dialog-title>Confirm deleting {{ name }}?</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-raised-button mat-dialog-close class="left" color="accent">Cancel</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn" >Delete</button>
    </mat-dialog-actions>
  `,
  styles: [`
    `]
})

export class DeleteModalComponent implements OnInit {
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }
  ngOnInit(): void {
    this.name = this.data.name;
  }
}