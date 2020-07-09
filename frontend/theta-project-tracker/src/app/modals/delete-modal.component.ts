import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  template: `
    <h2 mat-dialog-title>{{'confirm-delete' | translate}} {{ name }}?</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions" align="end">
      <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn" >{{'delete' | translate}}</button>
    </mat-dialog-actions>
  `,
  styles: [`
  .right {
    margin-left: 10px;
  }
    `]
})

export class DeleteModalComponent implements OnInit {
  name: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }
  ngOnInit(): void {
    this.name = this.data.name;
  }
}