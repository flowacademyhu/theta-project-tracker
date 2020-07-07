import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { Subscription } from 'rxjs';

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
  <label for="clients">{{'clients' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
    <mat-select formControlName="clientId">
      <mat-option *ngFor="let client of clients" [value]="client.id">{{ client.name }}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <label for="description">{{'description' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="description">
    </mat-form-field>
  </div>
  <label for="budget">{{'budget' | translate}}</label>
  <div>
    <mat-form-field class="cost">
      <input matInput type="number" formControlName="budget">
    </mat-form-field>
    <div class="actions" align="end">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button class="second"  (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdProject" color="warn"
  [disabled]="newProject.invalid"
  >{{"save"| translate}} </button>
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
  .cost {
    width: 120px;
  }
  `]
})
export class NewProjectComponent implements OnInit, OnDestroy {

  constructor(private projectService: ProjectService, private clientService: ClientService) { }
  newProject = new FormGroup({
    name: new FormControl(null, Validators.required),
    clientId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    budget: new FormControl(null, [Validators.required, Validators.min(0)]),
  })
  createdProject: Project;
  subscriptions$: Subscription[] = [];
  @Input() projectToEdit: Project;
  clients: Client[] = [];
  ngOnInit(): void {
    this.clientService.fetchClients().subscribe(clients => {
      this.clients = clients;
    })
    if (this.projectToEdit) {
      this.newProject.patchValue(this.projectToEdit);
    }
  }
  onAddNewProject() {
    this.createdProject = this.newProject.getRawValue();
    this.projectService.addProject(this.createdProject).subscribe();
  }

  editProject() {
    this.projectService.updateProject(this.projectToEdit.id, this.newProject.getRawValue()).subscribe();
  }
  onCloseDialog() {
    if (this.projectToEdit) {
      this.projectService.updateProject(this.projectToEdit.id, this.newProject.getRawValue()).subscribe();
    } else {
      this.createdProject = this.newProject.getRawValue();
      this.projectService.addProject(this.createdProject).subscribe();
    }
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}