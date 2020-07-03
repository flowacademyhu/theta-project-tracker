import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ProjectService } from '../services/project.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-reports',
  template: `
<div class="reports">
  <button mat-raised-button (click)="onClickReportByProjectHour()">{{'report-by-project-hours' | translate}}</button>
  <button mat-raised-button (click)="onClickReportByProjectCost()">{{'report-by-project-money' | translate}}</button>
  <button mat-raised-button (click)="onClickReportByUserHours()">{{'report-by-contractor-hours' | translate}}</button>
  <button mat-raised-button (click)="onClickReportByUserCost()">{{'report-by-contractor-money' | translate}}</button>
  <button mat-raised-button (click)="onClickReportByProjectBudget()">{{'project-budget-report' | translate}}</button>
</div>

<app-reports-table *ngIf="items" [items]="items" [filteredItems]="filteredItems"></app-reports-table>
  `,
  styles: [`
  .reports {
    display: flex;
    justify-content: center;
  }
  button {
    margin: 15px;
  }
  `],
})
export class ReportsComponent implements OnInit {
  items;
  filteredItems;
  projects = new FormControl();
  projectList;
  constructor(private reportsService: ReportsService, private projectService: ProjectService) { }
  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe(projects => {
      this.projectList = projects;
    })
    this.onClickReportByProjectHour();
  }

  onClickReportByProjectHour() {
    this.reportsService.getReportsByProjectHours().subscribe(values => {
      this.items = values;
    })
  }
  onClickReportByProjectCost() {
    this.reportsService.getReportsByProjectCost().subscribe(values => {
      this.items = values;
    })
  }
  onClickReportByUserHours() {
    this.reportsService.getReportsByUserHours().subscribe(values => {
      this.items = values;
    })
  }  onClickReportByUserCost() {
    this.reportsService.getReportsByUserCost().subscribe(values => {
      this.items = values;
    })
  }  onClickReportByProjectBudget() {
    this.reportsService.getReportsBudget().subscribe(values => {
      this.items = values;
    })
  }
}
