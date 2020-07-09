import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <h2 mat-dialog-title>{{ 'confirmation' | translate}}</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions" align="end">
      <button mat-raised-button mat-dialog-close class="left" color="accent" tabindex=-1>{{ 'no' | translate }}</button>
      <button class="second" mat-raised-button [mat-dialog-close]="true" class="right" color="warn" tabindex=-1>{{ 'yes' | translate }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
  .second {
    margin-right:50px;
  }
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