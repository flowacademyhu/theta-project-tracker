import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Milestone } from '../models/milestone.model';
import { MilestoneService } from '../services/milestone.service';
import { EventEmitter } from '@angular/core';

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
      <input matInput type="text" formControlName="project">
    </mat-form-field>
  </div>
  <label for="description">{{'description' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="description">
    </mat-form-field>
  </div>
    <div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{'canel' | translate}}</button>
  <button (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdMilestone" color="warn">Save</button>
</div>

  `,
})
export class NewMilestoneComponent implements OnInit {

  constructor(private milestoneService: MilestoneService) { }

  newMilestone = new FormGroup({
    name: new FormControl(null, Validators.required),
    project: new FormControl(null, Validators.required),
    description: new FormControl(null, [Validators.required]),
  })
  createdMilestone: Milestone;
  emitter: EventEmitter<Milestone> = new EventEmitter<Milestone>();
  @Input() milestoneToEdit: Milestone;
  ngOnInit(): void {
    if (this.milestoneToEdit) {
      this.newMilestone.patchValue(this.milestoneToEdit);
    }
  }

  onAddNewMilestone() {
    this.createdMilestone = {
      name: this.newMilestone.getRawValue().name,
      project: this.newMilestone.getRawValue().project,
      description: this.newMilestone.getRawValue().description,
    };
    this.emitter.emit(this.createdMilestone);
    this.milestoneService.addMilestone(this.createdMilestone);
  }
  editMilestone() {
    console.log(this.milestoneToEdit);
    this.milestoneToEdit = {
      id: this.milestoneToEdit.id,
      name: this.newMilestone.getRawValue().name,
      project: this.newMilestone.getRawValue().project,
      description: this.newMilestone.getRawValue().description
    };
    this.milestoneService.updateMilestone(this.milestoneToEdit.id, this.milestoneToEdit).subscribe();
  }
  onCloseDialog() {
    if (this.milestoneToEdit) {
      this.milestoneService.updateMilestone(this.milestoneToEdit.id, this.newMilestone.getRawValue());
    } else {
      this.createdMilestone = this.newMilestone.getRawValue();
      console.log(this.newMilestone.getRawValue())
      this.milestoneService.addMilestone(this.createdMilestone).subscribe();
    }
  }
}
