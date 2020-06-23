import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectAssigned } from '../models/user.model';

@Component({
  selector: 'app-timesheet',
  template: `
  <div>
  <ng-container *ngFor="let project of projects; let i = index">
  <app-record-one-week [project]="project"
  (projectEmitter)="recordDailyHours($event)"
  (projectToDelete)="destroyProject($event)"
  ></app-record-one-week>
  <mat-divider></mat-divider>
  </ng-container>
  <div class="footer">
  Total 
  <mat-grid-list cols="7" rowHeight="30px">
  <mat-grid-tile *ngFor="let day of days" [colspan]="1" ><p>{{ day.total }}&emsp;</p><p [ngStyle]="{'color': 'red'}">{{ day.overTime }}</p></mat-grid-tile>
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
  monday = 0;
  tuesday = 0;
  wednesday = 0;
  thursday = 0;
  friday = 0;
  saturday = 0;
  sunday = 0;
  mondayOver = 0;
  tuesdayOver = 0;
  wednesdayOver = 0;
  thursdayOver = 0;
  fridayOver = 0;
  saturdayOver = 0;
  sundayOver = 0;
  total = 0;
  days = [
    { name: 'monday', total: this.monday, overTime: this.mondayOver },
    { name: 'tuesday', total: this.tuesday, overTime: this.tuesdayOver },
    { name: 'wednesday', total: this.wednesday, overTime: this.wednesdayOver },
    { name: 'thursday', total: this.thursday, overTime: this.thursdayOver },
    { name: 'friday', total: this.friday, overTime: this.fridayOver },
    { name: 'saturday', total: this.saturday, overTime: this.saturdayOver },
    { name: 'sunday', total: this.sunday, overTime: this.sundayOver },
  ]
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.projects = this.authService.getAdmin().projectAssigned;
  }
  recordDailyHours(event: any) {
    console.log(event.name);
    if (this.projectsArrived.length === 0) {
      this.projectsArrived.push(event)
    } else if (this.projectsArrived.length > 0) {
      this.projectsArrived.push(event);
      for (let i = 0; i < this.projectsArrived.length; i++) {
        if (this.projectsArrived[i].name === event.name) {
          this.projectsArrived[i] = event;
        }
      }
    }

    console.log(this.projectsArrived)
    this.getMondayTotals()
  }
  getMondayTotals() {
    let total = 0;
    for (let i = 0; i < this.projectsArrived.length; i++) {
      total += this.projectsArrived[i].normalHours.monday
    }
    this.monday = total;
    this.days = [
      { name: 'monday', total: this.monday, overTime: this.mondayOver },
      { name: 'tuesday', total: this.tuesday, overTime: this.tuesdayOver },
      { name: 'wednesday', total: this.wednesday, overTime: this.wednesdayOver },
      { name: 'thursday', total: this.thursday, overTime: this.thursdayOver },
      { name: 'friday', total: this.friday, overTime: this.fridayOver },
      { name: 'saturday', total: this.saturday, overTime: this.saturdayOver },
      { name: 'sunday', total: this.sunday, overTime: this.sundayOver },
    ]
  }
  destroyProject(event: any) {
    this.projects.splice(this.projects.findIndex(p => p.projectName === event), 1);
  }

}
