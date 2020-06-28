import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';

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
    <mat-select formControlName="clientId">
      <mat-option *ngFor="let client of clients" [value]="client.id">{{ client.name }}</mat-option>
      </mat-select>
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

  constructor(private projectService: ProjectService, private clientService: ClientService) { }
  newProject = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    clientId: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    budget: new FormControl(null, [Validators.required, Validators.min(0)]),
  })
  createdProject: Project;
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
    console.log(this.newProject.getRawValue())
    this.projectToEdit = {
      id: this.projectToEdit.id,
      name: this.newProject.getRawValue().name,
      clientId: this.newProject.get('client').value,
      description: this.newProject.getRawValue().description,
      budget: this.newProject.getRawValue().budget,
    };
    this.projectService.updateProject(this.projectToEdit.id, this.projectToEdit).subscribe();
  }
  onCloseDialog() {
    if (this.projectToEdit) {
      console.log(this.newProject.getRawValue())
      this.projectService.updateProject(this.projectToEdit.id, this.newProject.getRawValue()).subscribe();
    } else {
      this.createdProject = this.newProject.getRawValue();
      this.projectService.addProject(this.createdProject).subscribe();
    }
  }
}