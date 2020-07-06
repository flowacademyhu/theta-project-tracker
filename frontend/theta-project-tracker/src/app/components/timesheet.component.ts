import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectAssigned } from '../models/user.model';
import { RecordCreate } from '../models/record-create.model';
import { ProjectUsersService } from '../services/projectUsers.service';
import { RecordOneWeekComponent } from './record-one-week.component';
import { MilestoneService } from '../services/milestone.service';
import { ActionLabelService } from '../services/action-label.service';
import { TimesheetService, DailyRecord, ResponseItem } from '../services/timsheet.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-timesheet',
  template: `
  <div class="weekdays">
  <mat-grid-list cols="7" rowHeight="30px">
    <div class="save"> <button (click)="onSaveRecors()" mat-raised-button
        color="primary">{{ 'save-record' | translate }}</button></div>
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
    margin-top: 150px;
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
  `],
})
export class TimesheetComponent implements OnInit, OnDestroy {

  projects: ProjectAssigned[] = [];
  week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  dates: string[] = [];
  record: RecordCreate;
  @ViewChild('container', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
  projectsArrived: {
    name: string;
    normalHours: {
      monday: number;
      tuesday: number;
      wednesday: number;
      thursday: number;
      friday: number;
      saturday: number;
      sunday: number;
    }
    overTime: {
      monday: number;
      tuesday: number;
      wednesday: number;
      thursday: number;
      friday: number;
      saturday: number;
      sunday: number;
    }
  }[] = [];
  days: { name?: string, total?: number, overTime?: number }[] = [];
  totals: number[] = [];
  overs: number[] = [];
  TOTALS: { total: number; over: number }[] = [];
  response: any;
  responseArray = [];
  subscription$: Subscription[] = [];
  constructor(private authService: AuthService, private projectUserService: ProjectUsersService,
    private resolver: ComponentFactoryResolver, private milestoneService:
      MilestoneService, private actionLabelService: ActionLabelService, private timesheetService:
      TimesheetService) { }
  ngOnDestroy(): void {
    this.subscription$.forEach(sub => sub.unsubscribe())
  }

  ngOnInit(): void {

    this.response = this.timesheetService.getResp();
    this.createFromResponse();
    this.getDate();
    this.projectUserService.getUsersProjects(this.authService.authenticate().id).subscribe(projects => {
      this.projects = projects;
      console.log('ngoninit', this.projects)
    })

    this.makeArray();
    console.log(this.responseArray)
    this.getTotals(this.responseArray);
  }
  makeArray() {
    let dataIndex = 0;
    for (let i = 0; i < this.response.projects.length; i++) {
      this.responseArray[i] = new Array<ResponseItem[]>();
      for (let j = 0; j < 7; j++) {
        this.responseArray[i][j] = {
          id: this.response.data[dataIndex].id,
          normalHours: this.response.data[dataIndex].normalHours,
          overTime: this.response.data[dataIndex].overTime
        }
        dataIndex++;
      }
    }
    return this.responseArray;
  }
  getDate() {
    this.response.weekDays.forEach(date => {
      this.dates.push(date);
    })
    return this.days;
  }

  onSaveRecors() {
    console.log(this.responseArray)
  }
  /*   destroyProject(event: any) {
      this.projects.splice(this.projects.findIndex(p => p.projectName === event), 1);
      this.projectsArrived.splice(this.projects.findIndex(p => p.projectName === event), 1);
      
    } */
  getTotals(array) {
    const totalsNormal = [];
    const totalsOver = []
    for (let i = 0; i < array.length; i++) {
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
  createRecordComponent(event: RecordCreate) {
    this.record = event;
    console.log(event)
    const factory = this.resolver.resolveComponentFactory(RecordOneWeekComponent);
    const componentRef = this.entry.createComponent(factory);
    componentRef.instance.desc = event.description;
    console.log('this.projects', this.projects)
    componentRef.instance.project = this.projects.find(p => p.projectId === this.record.projectId).name
    componentRef.instance.ID = this.response.projects.length + 1;
    this.milestoneService.fetchMilestones().subscribe(milestones => {
      componentRef.instance.milestone = milestones.find(m => m.id === this.record.milestoneId).name;
    })
    this.actionLabelService.fetchActionLabels().subscribe(labels => {
      componentRef.instance.actionLabel = labels.find(l => l.id === this.record.actionLabelId).name
    })
    componentRef.instance.projectToDelete.subscribe(() => {
      componentRef.destroy();
    })
    this.subscription$.push(componentRef.instance.timeSheet.valueChanges.subscribe(changes => {
      if (changes) {
        this.checkForUpdates(componentRef, this.responseArray)
      }
    }))
  }
  createFromResponse() {
    const factory = this.resolver.resolveComponentFactory(RecordOneWeekComponent);
    if (this.response.projects.length > 0) {
      let dayCount = 0;
      let week = 7;
      let dayIndex = 0;
      let dataIndex = 0;
      const res = this.response.projects;
      for (let i = 0; i < res.length; i++) {
        const componentRef = this.entry.createComponent(factory);
        componentRef.instance.projectId = res[i].projectId;
        componentRef.instance.milestoneId = res[i].milestoneId;
        componentRef.instance.activityId = res[i].actionLabelId;
        componentRef.instance.ID = i;
        for (let j = 0; j < 7; j++) {
          let day = this.week[dayIndex];
          let oneDay: DailyRecord = this.response.data[dataIndex];
          componentRef.instance.timeSheet.get('normalHours').get(day).patchValue(oneDay.normalHours);
          componentRef.instance.timeSheet.get('overTime').get(day).patchValue(oneDay.overTime);
          if (j === week - 1) {
            dayIndex = 0
          } else {
            dayIndex++;
          }
          dataIndex++;
        }

        /*  dayCount += 7;
         week += 7; */
        this.subscription$.push(componentRef.instance.projectToDelete.subscribe(() => {
          componentRef.destroy();
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
    console.log('changed', array)
    return array;
  }
}
