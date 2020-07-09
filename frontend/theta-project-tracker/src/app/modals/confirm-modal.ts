import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <h2 mat-dialog-title>{{ 'confirmation' | translate}}</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions">
      <button mat-raised-button mat-dialog-close class="left" color="accent">{{ 'no' | translate }}</button>
      <button mat-raised-button [mat-dialog-close]="true" class="right" color="warn" >{{ 'yes' | translate }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
  mat-dialog-actions {
    display: flex;
    flex-direction: row;
    justify-content: center !important;
  }
  h2 {
    text-align: center;
  }
    `]
})

export class ConfirmModalComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
}