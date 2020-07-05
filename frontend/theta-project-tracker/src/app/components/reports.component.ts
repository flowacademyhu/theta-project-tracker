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

<mat-form-field appearance="fill">
    <mat-label>From:</mat-label>
    <input matInput [matDatepicker]="picker" (dateChange)="onStartDateChange($event)">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker startView="month" [startAt]="startDate"></mat-datepicker>
</mat-form-field>

<mat-form-field appearance="fill">
    <mat-label>To:</mat-label>
    <input matInput [matDatepicker]="picker2">
    <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
    <mat-datepicker #picker2 startView="month" [startAt]="endDate"></mat-datepicker>
</mat-form-field>
<app-reports-table *ngIf="items" [items]="items" [filteredItems]="filteredItems"></app-reports-table>

  `,
  styles: [`
  .reports {
    width: 80%;
    margin: auto;
  }
  `],
})
export class ReportsComponent implements OnInit {
  items;
  filteredItems;
  startDate: Date;
  endDate: Date;
  projects = new FormControl();
  projectList;
  constructor(private reportsService: ReportsService, private projectService: ProjectService) { }
  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe(projects => {
      this.projectList = projects;
    })
    this.onClickReportByProjectHour();
  }

  onStartDateChange(event) {
    this.startDate = event.value;
    this.onClickReportByProjectHour();
  }

  onClickReportByProjectHour() {
    this.reportsService.getReportsByProjectHours(this.startDate, this.endDate).subscribe(values => {
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
