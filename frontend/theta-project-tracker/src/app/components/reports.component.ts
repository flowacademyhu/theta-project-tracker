import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-reports',
  template: `
<div class="reports">
  <button mat-raised-button (click)="onClickReportByProjectHour()">{{'report-by-project-hours' | translate}}</button>
  <button mat-raised-button (click)="onClickReportByProjectCost()">{{'report-by-project-money' | translate}}</button>
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
  public items;
  constructor(private reportsService: ReportsService) { }
  ngOnInit(): void {
    this.onClickReportByProjectHour();
  }
  onClickReportByProjectHour() {
    this.reportsService.getReportsByProjectHour().subscribe(values => {
      this.items = values;
    })
  }
  onClickReportByProjectCost() {
    this.reportsService.getReportsByProjectCost().subscribe(values => {
      this.items = values;
    })
  }
}
