import { Component, } from '@angular/core';
import { ReportsService, Result } from '../services/reports.service';
import { ProjectService } from '../services/project.service';
import { FormControl } from '@angular/forms';
import { map, switchMap, startWith, pluck } from 'rxjs/operators';
import { ReplaySubject, combineLatest, } from 'rxjs';
import { Project } from '../models/project.model';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

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

<mat-form-field *ngIf="[1,2,5].includes(whichTabIsShown)" appearance="fill">
  <mat-label>Projects</mat-label>
  <mat-select [formControl]="projects" multiple>
    <mat-option *ngFor="let project of projectList$ | async" [value]="project">{{project.name}}</mat-option>
  </mat-select>
</mat-form-field>

<mat-form-field *ngIf="[3,4].includes(whichTabIsShown)" appearance="fill">
  <mat-label>Users</mat-label>
  <mat-select [formControl]="users" multiple>
    <mat-option *ngFor="let user of userList$ | async" [value]="user">{{user.firstName}} {{user.lastName}}</mat-option>
  </mat-select>
</mat-form-field>

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
  `],
})
export class ReportsComponent {
  whichTabIsShown = 1;
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
  userList$ = this.userService.fetchUsers().pipe(pluck('data'));

  constructor(private reportsService: ReportsService, private projectService: ProjectService, private userService: UserService) {
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

  onClickReportByProjectHour() {
    this.users.setValue([]);
    this.reportsService.getReportsByProjectHours().subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 1;
  }

  onClickReportByProjectCost() {
    this.users.setValue([]);
    this.reportsService.getReportsByProjectCost().subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 2;
  }

  onClickReportByUserHours() {
    this.projects.setValue([]);
    this.reportsService.getReportsByUserHours().subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 3;
  }
  
  onClickReportByUserCost() {
    this.projects.setValue([]);
    this.reportsService.getReportsByUserCost().subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 4;
  }

  onClickReportByProjectBudget() {
    this.reportsService.getReportsBudget().subscribe((result: any) => {
      this.itemsSubject.next(result);
    })
    this.whichTabIsShown = 5;
  }
}
