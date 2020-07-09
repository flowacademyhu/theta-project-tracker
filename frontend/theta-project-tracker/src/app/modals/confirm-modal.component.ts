import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <h2 mat-dialog-title>{{ 'confirmation' | translate}}</h2>
    <mat-dialog-content class="mat-typography">
    </mat-dialog-content>
    <mat-dialog-actions class="actions" align="end">
      <button mat-raised-button mat-dialog-close class="left" color="accent">{{ 'no' | translate }}</button>
      <button class="second" mat-raised-button [mat-dialog-close]="true" class="right" color="warn" >{{ 'yes' | translate }}</button>
    </mat-dialog-actions>
  `,
  styles: [`
  .second {
    margin-right:50px;
  }
    `]
})

export class ConfirmModalComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
}