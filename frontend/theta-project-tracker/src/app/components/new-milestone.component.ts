import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Milestone } from '../models/milestone.model';
import { MilestoneService } from '../services/milestone.service';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-milestone',
  template:`
  <form [formGroup]="newMilestone">
  <label for="name">{{'name' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="name">
    </mat-form-field>
  </div>
  <label for="project">{{'projects' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <mat-select formControlName="projectId">
      <mat-option *ngFor="let project of projects" [value]="project.id">{{ project.name }}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <label for="description">{{'description' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="description">
    </mat-form-field>
  </div>
    <div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdMilestone" color="warn">{{'save' | translate}}</button>
</div>

  `,
  styles: [
    `
    .actions {
      margin-top: 60px;
    }
    .full-width {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }
    mat-icon:hover {
      cursor: pointer;
    }
    `]
})
export class NewMilestoneComponent implements OnInit, OnDestroy {

  constructor(private milestoneService: MilestoneService, private projectService: ProjectService) { }

  newMilestone = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    projectId: new FormControl(null, Validators.required),
    description: new FormControl(null, [Validators.required]),
  })
  createdMilestone: Milestone;
  projects: Project[] = [];
  subscriptions$: Subscription[] = [];
  @Input() milestoneToEdit: Milestone;
  ngOnInit(): void {
    if (this.milestoneToEdit) {
      this.newMilestone.patchValue(this.milestoneToEdit);
    }
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
    })
  }
  onAddNewMilestone() {
    this.milestoneService.addMilestone(this.newMilestone.getRawValue()).subscribe();
  }
  editMilestone() {
    this.milestoneToEdit = this.newMilestone.getRawValue();
    this.milestoneService.updateMilestone(this.milestoneToEdit.id, this.milestoneToEdit).subscribe();
  }
  onCloseDialog() {
    if (this.milestoneToEdit) {
      this.milestoneService.updateMilestone(this.milestoneToEdit.id, this.newMilestone.getRawValue()).subscribe();
    } else {
      this.createdMilestone = this.newMilestone.getRawValue();
      this.milestoneService.addMilestone(this.createdMilestone).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}