import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { TimesheetService } from '../services/timsheet.service';
import { MilestoneService } from '../services/milestone.service';
import { ActionLabelService } from '../services/action-label.service';
import { ProjectUsersService } from '../services/projectUsers.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-record-one-week',
  template: `
 <div class="wrapper">
  <mat-grid-list cols="33" rowHeight="100px">
    <mat-grid-tile class="project" [colspan]="3" [rowspan]="1"><strong>{{project}}</strong>
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="2" [rowspan]="1">
      <p>{{ milestone }}</p>
     
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="3" [rowspan]="1" #extra>
      <p>{{actionLabel}}</p>
     
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="1" [rowspan]="1">
      <mat-icon  matTooltip="{{ desc }}">sms</mat-icon>
    </mat-grid-tile>
    <mat-grid-tile class="tile" *ngFor="let day of days" [colspan]="day.cols" [rowspan]="day.rows">
      <form [formGroup]="timeSheet">
        <mat-form-field appearance="outline" formGroupName="normalHours">
          <input type="number" matInput formControlName="{{ day.name }}">
        </mat-form-field>
        <mat-form-field appearance="outline" color="warn" formGroupName="overTime">
          <input type="number" matInput placeholder="OT" formControlName="{{ day.name }}">
        </mat-form-field>
      </form>
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="2" [rowspan]="1">
      <button mat-icon-button>
        <mat-icon (click)="onDeleteProject()">clear</mat-icon>
      </button>
    </mat-grid-tile>
  </mat-grid-list>
</div>
  `,
  styles: [`
  mat-form-field {
    width: 50px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
   .wrapper {
    margin: auto;
    width: 80%;
    overflow: auto;
  }

  #extra {
    text-align: left;
  }
  `]
})
export class RecordOneWeekComponent implements OnInit {
  projectId: number;
  project: string;
  milestoneId: number;
  milestone: string;
  activityId: number;
  actionLabel: string;
  desc: string;
  ID: number;
  days = [
    { cols: 3, rows: 1, name: 'mon' },
    { cols: 3, rows: 1, name: 'tue' },
    { cols: 3, rows: 1, name: 'wed' },
    { cols: 3, rows: 1, name: 'thu' },
    { cols: 3, rows: 1, name: 'fri' },
    { cols: 3, rows: 1, name: 'sat' },
    { cols: 3, rows: 1, name: 'sun' },
  ];
  @Output() buttonToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() projectToDelete: EventEmitter<string> = new EventEmitter<string>();
  timeSheet = new FormGroup({
    normalHours: new FormGroup({
      mon: new FormControl(0, Validators.max(8)),
      tue: new FormControl(0, Validators.max(8)),
      wed: new FormControl(0, Validators.max(8)),
      thu: new FormControl(0, Validators.max(8)),
      fri: new FormControl(0, Validators.max(8)),
      sat: new FormControl(0, Validators.max(8)),
      sun: new FormControl(0, Validators.max(8)),
    }),
    overTime: new FormGroup({
      mon: new FormControl(0),
      tue: new FormControl(0),
      wed: new FormControl(0),
      thu: new FormControl(0),
      fri: new FormControl(0),
      sat: new FormControl(0),
      sun: new FormControl(0),
    })
  })
  constructor(private timesheetService: TimesheetService, private milestoneService: MilestoneService,
    private actionLabelService: ActionLabelService, private projectUserService: ProjectUsersService, private authService: AuthService) { }
    week = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  ngOnInit(): void {
    if (this.milestoneId && this.projectId && this.activityId) {
      this.milestoneService.fetchMilestones().subscribe(milestones => {
        this.milestone = milestones.find(m => m.id === this.milestoneId).name;
      })
      this.actionLabelService.fetchActionLabels().subscribe(labels => {
        this.actionLabel = labels.find(l => l.id === this.activityId).name
      })
      this.projectUserService.getUsersProjects(this.authService.authenticate().id).subscribe(projects => {
        this.project = projects.find(p => p.projectId === this.projectId).name
      })
    }
  }
  onDeleteProject() {
    this.projectToDelete.emit(this.project);
  }
}
