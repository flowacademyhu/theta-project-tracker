import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  template: `
  <div class="reports">
  <button mat-raised-button >Report by Project - Hours</button>
  <button mat-raised-button >Report by Project - £</button>
  <button mat-raised-button >Report by Contractor - Hours</button>
  <button mat-raised-button >Report by Contractor - £</button>
  <button mat-raised-button >Project Budget Report</button>
 <app-reports-table [columns]="columns" [rows]="rows"></app-reports-table>
  </div>
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
