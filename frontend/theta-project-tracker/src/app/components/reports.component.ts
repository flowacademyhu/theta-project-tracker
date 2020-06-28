import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
<div class="reports">
  <button mat-raised-button>{{'report-by-project-hours' | translate}}</button>
  <button mat-raised-button>{{'report-by-project-money' | translate}}</button>
  <button mat-raised-button>{{'report-by-contractor-hours' | translate}}</button>
  <button mat-raised-button>{{'report-by-contractor-money' | translate}}</button>
  <button mat-raised-button>{{'project-budget-report' | translate}}</button>
</div>
<app-reports-table></app-reports-table>
  `,
  styles: [`
  .reports {
    width: 50%;
    margin: auto;
  }
  `],
})
export class ReportsComponent implements OnInit {
  rows = 'projects';
  columns = 'contractors';
  constructor() { }
  ngOnInit(): void {
  }
}
