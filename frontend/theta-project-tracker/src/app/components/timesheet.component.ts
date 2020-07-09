import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectAssigned } from '../models/user.model';
import { RecordCreate } from '../models/record-create.model';
import { ProjectUsersService } from '../services/projectUsers.service';
import { RecordOneWeekComponent } from './record-one-week.component';
import { TimesheetService, ResponseItem, UpdateRecords, TimeRecordResponse, CopyLastWeek } from '../services/timsheet.service';
import { Subscription } from 'rxjs';
import { DatePickerService } from '../services/date-picker.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-timesheet',
  template: `
  <div>
  <ng-template #container>

  </ng-template>
  <app-date-picker format='yyyy-MM-dd' (dateEmitter)="dateChange($event)" (onCopy)="createLastWeek($event)"></app-date-picker>
  <div class="warning" *ngIf="warn"><p [ngStyle]="{'color': 'red'}">{{ 'no-duplicates' | translate }}</p></div>
  <div class="weekdays">
  <mat-grid-list cols="7" rowHeight="30px">
    <div class="save"> <button (click)="onSaveRecors()" mat-raised-button
        color="primary" [disabled]="areRecordsValid">{{ 'save-record' | translate }}</button></div>
    <mat-grid-tile *ngFor="let day of week" [colspan]="1">
      <p><strong>{{ day | titlecase }}</strong></p>
    </mat-grid-tile>
  </mat-grid-list>
  <mat-grid-list cols="7" rowHeight="30px">
    <mat-grid-tile *ngFor="let date of dates" [colspan]="1">
      <p>{{ date | date:'mediumDate' }}</p>
    </mat-grid-tile>
  </mat-grid-list>
</div>
<mat-divider></mat-divider>
<div class="recordTime">
  <ng-template #container></ng-template>
  <div *ngIf="responseArray.length > 0">
  <mat-divider></mat-divider>
  <div class="footer">
    <mat-grid-list cols="7" rowHeight="30px">
      <div>
        <p> {{'total' | translate}}&emsp;</p>
        <mat-grid-tile [colspan]="1" *ngFor="let total of totals; let i = index">
          <p>&emsp;{{ total }}&emsp;</p>
          <p [ngStyle]="{'color': 'red'}">&emsp;{{ overs[i] }}&emsp;</p>
        </mat-grid-tile>
      </div>
    </mat-grid-list>
  </div>
</div>
<app-record-create (recordEmitter)="createRecordComponent($event)"></app-record-create>
  `,
  styles: [`
  .recordTime{
    margin-top: 50px;
  }
    .save {
  margin-left: -200px;
  }
  .weekdays {
    margin-top: 70px;
    margin-left: 560px;
    width: 56%
  }

  .footer {
    margin-top: 5px;
    width: 56%;
    margin-left: 545px;
    }
  mat-divider {
    width: 80%;
    margin: auto;
  }
  .warning {
    width: 9%;
    margin-right: auto;
    margin-left: auto;
  }
  `],
})
export class TimesheetComponent implements OnInit, OnDestroy {

  projects: ProjectAssigned[] = [];
  week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  dates: string[] = [];
  @ViewChild('container', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
  totals: number[] = [];
  overs: number[] = [];
  response: TimeRecordResponse;
  responseArray = [];
  subscription$: Subscription[] = [];
  areRecordsValid: boolean;
  currentDisplayedDate: string;
  warn: boolean;
  constructor(private authService: AuthService, private projectUserService: ProjectUsersService,
    private resolver: ComponentFactoryResolver, private timesheetService:
      TimesheetService, private datePickerService: DatePickerService) { }
  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {
    this.displayTimeSheet()
    this.projectUserService.getUsersProjects(this.authService.authenticate().id).subscribe(projects => {
      this.projects = projects;
    })
  }
  dateChange(event: string) {
    this.currentDisplayedDate = event;
    this.displayTimeSheet(this.currentDisplayedDate);
  }
  makeArray(response) {
    let dataIndex = 0;
    this.responseArray = [];
    for (let i = 0; i < response.projects.length; i++) {
      this.responseArray[i] = new Array<ResponseItem[]>();
      for (let j = 0; j < 7; j++) {
        this.responseArray[i][j] = {
          id: this.response.data[dataIndex].id,
          normalHours: this.response.data[dataIndex].normalHours,
          overTime: this.response.data[dataIndex].overTime
        }
        dataIndex++;
      }
      this.projectsArrived.push(event)
    }
    this.getWeeklyTotal()
  }
  getWeeklyTotal() {
    this.getMondayTotals();
    this.getTuesdayTotals();
    this.getWednesdayTotals();
    this.getThursdayTotals();
    this.getFridayTotals();
    this.getThursdayTotals();
    this.getMondayTotals();
  }
  getMondayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.monday;
      over += this.projectsArrived[i].overTime.monday;
    }
    return this.days[0] = { name: 'monday', total: total, overTime: over };
  }
  getTuesdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.tuesday;
      over += this.projectsArrived[i].overTime.tuesday;
    }
    return this.days[1] = { name: 'tuesday', total: total, overTime: over };
  }
  getWednesdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.wednesday;
      over += this.projectsArrived[i].overTime.wednesday;
    }
    return this.days[2] = { name: 'wednesday', total: total, overTime: over };
  }
  getThursdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.thursday;
      over += this.projectsArrived[i].overTime.thursday
    }
    return this.days[3] = { name: 'thursday', total: total, overTime: over };
  }
  getFridayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.friday;
      over += this.projectsArrived[i].overTime.friday
    }
    return this.responseArray;
  }
  getDates() {
    this.dates = this.response.weekDays;
    return this.dates;
  }

  onSaveRecors() {
    let response: UpdateRecords;
    let oneDArray: ResponseItem[] = [];
    for (let i = 0; i < this.responseArray.length; i++) {
      for (let j = 0; j < this.responseArray[i].length; j++) {
        oneDArray.push(this.responseArray[i][j]);
      }
    }
    response = {
      modified: oneDArray
    }
    this.timesheetService.updateTimeRecords(response, this.currentDisplayedDate).subscribe();
  }
  getTotals(array) {
    const totalsNormal = [];
    const totalsOver = [];
    this.totals = [];
    this.overs = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i].length > 0) {
        for (let j = 0; j < 7; j++) {
          if (totalsNormal[j]) {
            totalsNormal[j] += array[i][j].normalHours;
            this.totals = totalsNormal
          } else {
            totalsNormal[j] = array[i][j].normalHours;
            this.totals = totalsNormal
          }
          if (totalsOver[j]) {
            totalsOver[j] += array[i][j].overTime;
            this.overs = totalsOver;
          } else {
            totalsOver[j] = array[i][j].overTime;
            this.overs = totalsOver
          }
        }
      }
    }
  }
  createLastWeek(event: any) {
    let body: CopyLastWeek = {
      date: this.currentDisplayedDate
    }
    this.timesheetService.copyLastWeek(body).subscribe(() => {
    this.displayTimeSheet(this.currentDisplayedDate);
    })
  }

  createRecordComponent(event: RecordCreate) {
    this.timesheetService.createTimeRecords(event, this.currentDisplayedDate).subscribe(() => {
      this.timesheetService.getTimeRecords(this.currentDisplayedDate).subscribe(array => {
        this.response = array
        this.componentManagement()
      })
    }, (error: HttpErrorResponse) => {
      this.warn = true;
      setTimeout(() => {
        this.warn = false;
      }, 3000);
      console.log(error.error);
    })
  }

  componentManagement(date?: string) {
    this.entry.clear()
    const factory = this.resolver.resolveComponentFactory(RecordOneWeekComponent);
    if (this.response.projects.length > 0) {
      this.makeArray(this.response);
      let dayIndex = 0;
      let dataIndex = 0;
      const res = this.response.projects;
      for (let i = 0; i < res.length; i++) {
        const componentRef = this.entry.createComponent(factory);
        componentRef.instance.projectId = res[i].projectId;
        componentRef.instance.milestoneId = res[i].milestoneId;
        componentRef.instance.activityId = res[i].actionLabelId;
        componentRef.instance.desc = res[i].description;
        componentRef.instance.ID = i;
        for (let j = 0; j < 7; j++) {
          let day = this.week[dayIndex];
          let oneDay: ResponseItem = this.response.data[dataIndex];
          componentRef.instance.timeSheet.get('normalHours').get(day).patchValue(oneDay.normalHours);
          componentRef.instance.timeSheet.get('overTime').get(day).patchValue(oneDay.overTime);
          if (j === 6) {
            dayIndex = 0
          } else {
            dayIndex++;
          }
          dataIndex++;
        }
        this.subscription$.push(componentRef.instance.projectToDelete.subscribe(() => {
          const uniqueIds = {
            milestoneId: componentRef.instance.milestoneId,
            actionLabelId: componentRef.instance.activityId
          }
          this.timesheetService.deleteTimeRecords(uniqueIds, this.currentDisplayedDate).subscribe(() => {
            this.timesheetService.getTimeRecords(this.currentDisplayedDate).subscribe(response => {
              this.response = response;
              this.componentManagement(this.currentDisplayedDate)
            })
          });
          this.responseArray.splice(componentRef.instance.ID, 1)
          this.getTotals(this.responseArray);
        }))
        this.subscription$.push(componentRef.instance.timeSheet.statusChanges.subscribe(status => {
          if (status === "VALID") {
            this.areRecordsValid = false;
          } else {
            this.areRecordsValid = true;
          }
        }))
        this.subscription$.push(componentRef.instance.timeSheet.valueChanges.subscribe(changes => {
          if (changes) {
            this.checkForUpdates(componentRef, this.responseArray)
          }
        }))
      }
    }
  }
  checkForUpdates(ref: ComponentRef<RecordOneWeekComponent>, array) {
    let copy = [...array];
    let id = ref.instance.ID;
    for (let i = 0; i < array.length; i++) {
      if (i === id) {
        for (let j = 0; j < 7; j++) {
          let day = this.week[j];
          array[i][j] = {
            id: copy[i][j].id,
            normalHours: ref.instance.timeSheet.get('normalHours').get(day).value,
            overTime: ref.instance.timeSheet.get('overTime').get(day).value
          }
        }
      }
    }
    this.getTotals(this.responseArray);
    return array;
  }
  displayTimeSheet(dateChange?: string) {
    this.timesheetService.getTimeRecords(dateChange).subscribe(response => {
      console.log(response)
      this.response = response;
      this.makeArray(this.response);
      this.getDates();
      this.componentManagement(dateChange)
      this.getTotals(this.responseArray);
    })
  }
}
