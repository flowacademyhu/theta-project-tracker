import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActionLabelService } from '../services/action-label.service';
import { ProjectService } from '../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActionLabel } from '../models/action-label.model';
import { Project } from '../models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-action-label',
  template:`
  <form [formGroup]="newActionLabel">
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
    <div class="actions" align="end">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button class="second" (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdActionLabel" color="primary" 
  [disabled]="newActionLabel.invalid"
  >{{'save' | translate}}</button>
</div>

  `,
  styles: [
    `
    .actions {
      margin-top: 60px;
    }
    .full-width {
      max-width: 250px;
      width: 100%;
    }
    mat-icon:hover {
      cursor: pointer;
    }
    .second {
      margin-left: 10px;
    }
    `]
})
export class NewActionLabelComponent implements OnInit, OnDestroy {

  constructor(private actionLabelService: ActionLabelService, private projectService: ProjectService) { }

  newActionLabel = new FormGroup({
    name: new FormControl(null, Validators.required),
    projectId: new FormControl(null, Validators.required),
  })
  createdActionLabel: ActionLabel;
  projects: Project[] = [];
  subscriptions$: Subscription[] = [];
  @Input() actionLabelToEdit: ActionLabel;
  ngOnInit(): void {
    if (this.actionLabelToEdit) {
      this.newActionLabel.patchValue(this.actionLabelToEdit);
    }
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
    })
  }
  onAddNewActionLabel() {
    this.actionLabelService.addActionLabel(this.newActionLabel.getRawValue()).subscribe();
  }
  editActionLabel() {
    this.actionLabelToEdit = this.newActionLabel.getRawValue();
    this.actionLabelService.updateActionLabel(this.actionLabelToEdit.id, this.actionLabelToEdit).subscribe();
  }
  onCloseDialog() {
    if (this.actionLabelToEdit) {
      this.actionLabelService.updateActionLabel(this.actionLabelToEdit.id, this.newActionLabel.getRawValue()).subscribe();
    } else {
      this.createdActionLabel = this.newActionLabel.getRawValue();
      this.actionLabelService.addActionLabel(this.createdActionLabel).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}