import { Component, OnInit, Output } from '@angular/core';
import { User, ProjectAssigned } from '../models/user.model';
import { Milestone } from '../models/milestone.model';
import { MilestoneService } from '../services/milestone.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionLabelService } from '../services/action-label.service';
import { ActionLabel } from '../models/action-label.model';
import { ProjectUsersService } from '../services/projectUsers.service';
import { RecordCreate } from '../modals/record-create.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-create',
  template: `
  <div class="wrapper">
  <form [formGroup]="recordCreate">
    <mat-form-field>
      <mat-label>{{'project-select' | translate }}</mat-label>
      <mat-select formControlName="projectId" (selectionChange)="onProjectSelect($event)">
        <mat-option *ngFor="let project of projects" [value]="project.id">{{ project.name }}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field>
      <mat-label>{{'milestone-select' | translate }}</mat-label>
      <mat-select formControlName="milestoneId" (selectionChange)="onMilestoneSelect($event)">
        <mat-option *ngFor="let milestone of milestones" [value]="milestone.id">{{ milestone.name }}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field>
      <mat-label>{{'activity-select' | translate }}</mat-label>
      <mat-select formControlName="actionLabelId">
        <mat-option *ngFor="let activity of activities" [value]="activity.id">{{ activity.name }}</mat-option>
      </mat-select>
    </mat-form-field>
    <mat-form-field>
      <mat-label>{{'description' | translate }}</mat-label>
      <textarea matInput type="text" formControlName="desc"></textarea>
    </mat-form-field>
    <button mat-raised-button type="button" (click)="onCreateNewRecord()"
      [disabled]="recordCreate.invalid">{{'add-record' | translate }}</button>
  </form>
</div>
  `,
  styles: [`
  mat-form-field {
    padding-right:20px;
    padding-left: 20px;
  }
  .wrapper {
    width: 70%;
    margin: auto;
  }
  `]
})
export class RecordCreateComponent implements OnInit {
  user: User;
  record: RecordCreate;
  projects: ProjectAssigned[];
  milestones: Milestone[];
  activities: ActionLabel[] = [];
  @Output() recordEmitter: EventEmitter<RecordCreate> = new EventEmitter<RecordCreate>();
  recordCreate: FormGroup = new FormGroup({
    projectId: new FormControl(null, Validators.required),
    milestoneId: new FormControl({ value: '', disabled: true }, Validators.required),
    actionLabelId: new FormControl({ value: '', disabled: true }, Validators.required),
    desc: new FormControl({ value: '', disabled: true }),
  })
  constructor(private milestoneService: MilestoneService,
    private authService: AuthService, private actionLabelService:
      ActionLabelService, private projectUserService: ProjectUsersService) { }

  ngOnInit() {
    this.user = this.authService.authenticate();
    this.projectUserService.getUsersProjects(this.user.id).subscribe(projects => {
      this.projects = projects;
    })
  }
  onProjectSelect(event: any) {
    if (event) {
      this.milestoneService.fetchMilestones().subscribe(milestones => {
        this.milestones = milestones.filter(m => m.projectId === this.recordCreate.get('projectId').value);
      })
      this.recordCreate.get('milestoneId').enable()
    }
  }
  onMilestoneSelect(event: any) {
    if (event) {
      this.actionLabelService.fetchActionLabels().subscribe(actions => {
        this.activities = actions.filter(a => a.projectId === this.recordCreate.get('projectId').value);
      })
      this.recordCreate.get('actionLabelId').enable()
      this.recordCreate.get('desc').enable()
    }
  }
  onCreateNewRecord() {
    this.record = this.recordCreate.getRawValue();
    this.record.userId = this.user.id;
    this.recordEmitter.emit(this.record);
  }
}