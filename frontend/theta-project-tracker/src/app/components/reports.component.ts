import { Component, } from '@angular/core';
import { ReportsService, Result } from '../services/reports.service';
import { ProjectService } from '../services/project.service';
import { FormControl } from '@angular/forms';
import { map, switchMap, startWith } from 'rxjs/operators';
import { ReplaySubject, combineLatest, } from 'rxjs';
import { Project } from '../models/project.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ExportsService } from '../services/export.service'
import * as moment from "moment";

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
<div class="date-filter">
<mat-form-field class="date-from-button" appearance="fill">
    <mat-label>{{'from' | translate}}</mat-label>
    <input matInput [matDatepicker]="picker" (dateChange)="onStartDateChange($event)">
    <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-datepicker #picker startView="month" [startAt]="startDate"></mat-datepicker>
</mat-form-field>

<mat-form-field appearance="fill">
    <mat-label>{{'to' | translate}}</mat-label>
    <input matInput [matDatepicker]="picker2" (dateChange)="onEndDateChange($event)">
    <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
    <mat-datepicker #picker2 startView="month" [startAt]="endDate"></mat-datepicker>
</mat-form-field>
</div>
<div class="row-filter">
<mat-form-field *ngIf="[1,2,5].includes(whichTabIsShown)" appearance="fill">
  <mat-label>{{'projects' | translate}}</mat-label>
  <mat-select [formControl]="projects" multiple>
    <mat-option *ngFor="let project of projectList$ | async" [value]="project">{{project.name}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field *ngIf="[3,4].includes(whichTabIsShown)" appearance="fill">
  <mat-label>{{'users' | translate}}</mat-label>
  <mat-select [formControl]="users" multiple>
    <mat-option *ngFor="let user of userList$ | async" [value]="user">{{user.firstName}} {{user.lastName}}</mat-option>
  </mat-select>
</mat-form-field>
</div>
<div class="wrapper">
<button mat-raised-button  (click)="onClickExport()">{{'export-to-excel' | translate}}</button>
</div>

<app-reports-table [items]="items$ | async" ></app-reports-table>
  `,
  styles: [`
  .reports {
    display: flex;
    justify-content: center;
  }
  button {
    margin: 15px;
  }
  .export-button {
    display: flex;
    justify-content:flex-end;
  }
  .date-filter {
    max-width: 80%;
    margin: auto;
  }
  .row-filter{
    max-width: 80%;
    margin: auto;
  }
  .wrapper {
    margin: auto;
    display: flex;
    justify-content:flex-end;
    max-width: 80%;
  }
  .date-from-button{
    margin-right:1rem;
  }
  `],
})

export class ReportsComponent {
  whichTabIsShown = 1;
  startDate = moment().format('YYYY-MM-DD');
  endDate = moment().format('YYYY-MM-DD');
  projects = new FormControl([]);
  users = new FormControl([]);
  private itemsSubject = new ReplaySubject<Result>();

  items$ = combineLatest(
    this.projects.valueChanges.pipe(startWith([])),
    this.users.valueChanges.pipe(startWith([]))
  )
  .pipe(
    switchMap(([projectFilter, userFilter]: [Project[], User[]]) => {
      return this.itemsSubject.asObservable().pipe(
        map(this.filterByProjects(projectFilter)),
        map(this.filterByUsers(userFilter))
      );
    })
  )

  projectList$ = this.projectService.fetchProjects();
  userList$ = this.userService.fetchUsers();

  constructor(private reportsService: ReportsService, private projectService: ProjectService, private userService: UserService, private exportsService: ExportsService) {
    this.onClickReportByProjectHour();
  }
  
  filterByProjects(projectFilter: Project[]): (dataSet: Result) => Partial<Result> {
    return (dataSet: Result) => {
      if (!projectFilter.length) {
        return dataSet;
      };
      let filtered = {}
      projectFilter.forEach((project: Project) => {
        const data = dataSet[project.name];
        if (data) {
          filtered[project.name] = data;
        }
      });
      return filtered;
    }
  }
  
  filterByUsers(userFilter: User[]): (dataset: Result) => Partial<Result> {
    return (dataSet: Result) => {
      if (userFilter.length === 0) {
        return dataSet;
      };
      let filtered = {}
      userFilter.forEach((user: User) => {
        const userName = `${user.firstName} ${user.lastName}`
        const data = dataSet[userName];
        if (data) {
          filtered[userName] = data;
        }
      });
      return filtered;
    }
  }

  onStartDateChange(event) {
    this.startDate = moment(event.value).format('YYYY-MM-DD');
    switch(this.whichTabIsShown) {
      case 1:
        this.onClickReportByProjectHour();
        break;
      case 2:
        this.onClickReportByProjectCost();
        break;
      case 3:
        this.onClickReportByUserHours();
        break;
      case 4:
        this.onClickReportByUserCost();
        break;
      case 5:
        this.onClickReportByProjectBudget();
        break;
    } 
  }
  onEndDateChange(event) {
    this.endDate = moment(event.value).format('YYYY-MM-DD');
    switch(this.whichTabIsShown) {
      case 1:
        this.onClickReportByProjectHour();
        break;
      case 2:
        this.onClickReportByProjectCost();
        break;
      case 3:
        this.onClickReportByUserHours();
        break;
      case 4:
        this.onClickReportByUserCost();
        break;
      case 5:
        this.onClickReportByProjectBudget();
        break;
    } 
  }
  onClickExport(){
    switch(this.whichTabIsShown) {
      case 1:
        this.onClickExportReportByProjectHours();
        break;
      case 2:
        this.onClickExportReportByProjectCost();
        break;
      case 3:
        this.onClickExportReportByUserHours();
        break;
      case 4:
        this.onClickExportReportByUserCost();
        break;
      case 5:
        this.onClickExportReportByProjectBudget();
        break;
    } 
  }
  onClickReportByProjectHour() {
    this.users.setValue([]);
    this.reportsService.getReportsByProjectHours(this.startDate, this.endDate).subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 1;
  }

  onClickReportByProjectCost() {
    this.users.setValue([]);
    this.reportsService.getReportsByProjectCost(this.startDate, this.endDate).subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 2;
  }

  onClickReportByUserHours() {
    this.projects.setValue([]);
    this.reportsService.getReportsByUserHours(this.startDate, this.endDate).subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 3;
  }
  
  onClickReportByUserCost() {
    this.projects.setValue([]);
    this.reportsService.getReportsByUserCost(this.startDate, this.endDate).subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 4;
  }

  onClickReportByProjectBudget() {
    this.reportsService.getReportsBudget(this.startDate, this.endDate).subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 5;
  }
  onClickExportReportByProjectHours(){
    this.exportsService.exportReportsByProjectHours();
  }
  onClickExportReportByProjectCost(){
    this.exportsService.exportReportsByProjectCost();
  }
  onClickExportReportByUserHours(){
    this.exportsService.exportReportsByUserHours();
  }
  onClickExportReportByUserCost(){
    this.exportsService.exportReportsByUserCost();
  }
  onClickExportReportByProjectBudget(){
    this.exportsService.exportReportsBudget();
  }
}
