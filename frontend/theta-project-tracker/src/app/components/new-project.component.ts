import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { EventEmitter } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-new-project',
  template: `
  <form [formGroup]="newProject">
  <label for="name">{{'name' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="name">
    </mat-form-field>
  </div>
  <label for="name">{{'clients' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="client">
    </mat-form-field>
  </div>
  <label for="email">{{'description' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="description">
    </mat-form-field>
  </div>
  <label for="cost">{{'budget' | translate}}</label>
  <div>
    <mat-form-field class="cost">
      <input matInput type="number" formControlName="budget">
    </mat-form-field>
    <div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdProject" color="warn">Save</button>
</div>
`,
styles: [`
`]
})
export class NewProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  newProject = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]),
    client: new FormControl(null, [Validators.required, Validators.pattern('.*\\S.*[a-zA-z0-9 ]')]),
    description: new FormControl(null, [Validators.required]),
    budget: new FormControl(null, [Validators.required, Validators.min(0)]),
  })
  createdProject: Project;
  emitter: EventEmitter<Project> = new EventEmitter<Project>();
  @Input() projectToEdit: Project;

  ngOnInit(): void {
    if (this.projectToEdit) {
      this.newProject.patchValue(this.projectToEdit);
    }
  }

  onAddNewProject() {
    this.createdProject = {
      name: this.newProject.getRawValue().name,
      client: this.newProject.getRawValue().client,
      description: this.newProject.getRawValue().description,
      budget: this.newProject.getRawValue().budget,
    };
    this.emitter.emit(this.createdProject);
    this.projectService.addProject(this.createdProject).subscribe();
  }

  editProject() {
    console.log(this.projectToEdit);
    this.projectToEdit = {
      id: this.projectToEdit.id,
      name: this.newProject.getRawValue().name,
      client: this.newProject.getRawValue().client,
      description: this.newProject.getRawValue().description, 
      budget: this.newProject.getRawValue().budget,
    };
    this.projectService.updateProject(this.projectToEdit.id, this.projectToEdit).subscribe();
  }
   onCloseDialog() {
    if (this.projectToEdit) {
      this.projectService.updateProject(this.projectToEdit.id, this.newProject.getRawValue());
    } else {
      this.createdProject = this.newProject.getRawValue();
      this.projectService.addProject(this.createdProject).subscribe();
    }
  }
}