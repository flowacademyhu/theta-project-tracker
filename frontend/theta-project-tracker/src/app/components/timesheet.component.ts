import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectAssigned } from '../models/user.model';

@Component({
  selector: 'app-timesheet',
  template: `
  <div>
  <ng-container *ngFor="let project of projects; let i = index">
    <app-record-one-week [project]="project" (projectEmitter)="recordDailyHours($event)"
      (projectToDelete)="destroyProject($event)"></app-record-one-week>
    <mat-divider></mat-divider>
  </ng-container>
  <div class="footer">
    {{'total' | translate}}
    <mat-grid-list cols="7" rowHeight="30px">
      <mat-grid-tile *ngFor="let day of days" [colspan]="1">
        <p>{{ day.total }}&emsp;</p>
        <p [ngStyle]="{'color': 'red'}">{{ day.overTime }}</p>
      </mat-grid-tile>
    </mat-grid-list>
  </div>
</div>
  `,
  styles: [`
  div{
    margin-top: 200px;
  }
  mat-grid-tile {
  width: 70%;
    margin:auto;
  }
  .footer {
    margin-top: 0;
    width: 45%;
    margin: auto;
    }
  mat-divider {
    width: 80%;
    margin: auto;
  }
  `],
})
export class TimesheetComponent implements OnInit {

  projects: ProjectAssigned[];
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
  days: {name:string, total: number, overTime: number}[] = [];
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.projects = this.authService.authenticate().projects;
  }
  recordDailyHours(event: any) {
   if (this.projectsArrived.length === 0) {
     this.projectsArrived.push(event)
   } else {
     for(let i = 0; i < this.projectsArrived.length; i++) {
       if (this.projectsArrived[i].name === event.name) {
         this.projectsArrived[i] = event
         this.getWeeklyTotal()
         return this.projectsArrived
       }
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
    this.getSaturdayTotals();
    this.getSundayTotals();
  }
  getMondayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.monday
      over += this.projectsArrived[i].overTime.monday
    }
    return this.days[0] = {name: 'monday', total: total, overTime: over};
  }
  getTuesdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.tuesday
      over += this.projectsArrived[i].overTime.tuesday
    }
    return this.days[1] = {name: 'tuesday', total: total, overTime: over};
  }
  getWednesdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.wednesday;
      over += this.projectsArrived[i].overTime.wednesday
    }
    return this.days[2] = {name: 'wednesday', total: total, overTime: over};
  }
  getThursdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.thursday;
      over += this.projectsArrived[i].overTime.thursday
    }
    return this.days[3] = {name: 'thursday', total: total, overTime: over};
  }
  getFridayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.friday;
      over += this.projectsArrived[i].overTime.friday
    }
    return this.days[4] = {name: 'friday', total: total, overTime: over};
  }
  getSaturdayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.saturday;
      over += this.projectsArrived[i].overTime.saturday
    }
    return this.days[5] = {name: 'saturday', total: total, overTime: over};
  }
  getSundayTotals() {
    let total = 0;
    let over = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.sunday;
      over += this.projectsArrived[i].overTime.sunday
    }
    return this.days[6] = {name: 'sunday', total: total, overTime: over};
  }
  destroyProject(event: any) {
    this.projects.splice(this.projects.findIndex(p => p.projectName === event), 1);
    this.projectsArrived.splice(this.projects.findIndex(p => p.projectName === event), 1);
    this.getWeeklyTotal();
  }
}
