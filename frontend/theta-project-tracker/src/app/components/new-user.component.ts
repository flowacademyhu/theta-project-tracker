import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, UserCreate, ProjectAssigned } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-new-user',
  template: `
  <form [formGroup]="newUser">
  <label for="name">{{ 'firstname' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="firstName">
    </mat-form-field>
  </div>
  <label for="name">{{'lastname' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="lastName">
    </mat-form-field>
  </div>
  <label for="email">{{'email' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="email">
    </mat-form-field>
  </div>
  <label for="password">{{'password' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput [type]="isPasswordVisible ? 'text' : 'password'"formControlName="password">
      <mat-icon matSuffix (click)="onShowPassword()">{{ isPasswordVisible ? 'visibility' : 'visibility_off' }}</mat-icon>
    </mat-form-field>
  </div>
  <label for="cost">{{'cost' | translate}}</label>
  <div>
    <mat-form-field class="cost">
      <input matInput type="number" formControlName="costToCompanyPerHour">
    </mat-form-field>
  </div>
  <label for="role">{{'role' | translate}}</label>
  <div>
    <mat-form-field>
      <mat-select formControlName="role">
        <mat-option value="user">{{'user' | translate}}</mat-option>
        <mat-option value="admin">{{'admin' | translate}}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <label>{{'projects-assigned' | translate}}</label>
  <div>
    <table>
      <tr>
        <th>{{'project-name' | translate}}</th>
        <th>{{'cost-to-client' | translate}}</th>
        <th>{{'unassign' | translate}}</th>
      </tr>
      <tr *ngFor="let project of assignedProjects; let i = index">
        <td>{{project.projectName}}</td>
        <td>{{project.costToClientPerHour}}</td>
        <td>
          <mat-icon (click)="onDeleteProject(project)">clear</mat-icon>
        </td>
      </tr>
      <tr>
        <td>
          <mat-form-field>

            <mat-select formControlName="projectId">
              <mat-option *ngFor="let project of availableProjects" [value]="project.id">{{ project.name }}</mat-option>
            </mat-select>

          </mat-form-field>

        </td>
        <td>
          <mat-form-field>
            <input type="number" matInput formControlName="costToClient">
          </mat-form-field>
        </td>
      </tr>
    </table>
    <button mat-raised-button (click)="onAddNewProject()">{{'add-new' | translate}}</button>
  </div>
</form>
<div class="actions" align="end">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button class="second" (click)="onAddNewUser()" mat-raised-button [mat-dialog-close]="createdUser" color="primary"
  [disabled]="newUser.invalid"
  >{{'save' | translate}}</button>
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
    .selection {
      max-width: 150px;
      margin: 10px;
    }
    th,td {
      padding-right: 35px;
    }
    .cost {
      max-width: 100px
    }
    mat-icon:hover {
      cursor: pointer;
    }
    .second {
      margin-left: 10px;
    }
    `
  ]
})
export class NewUserComponent implements OnInit {

  newUser = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    costToCompanyPerHour: new FormControl(null, [Validators.required, Validators.min(0)]),
    role: new FormControl(null, Validators.required),
    projectId: new FormControl(null),
    costToClient: new FormControl(null),
  });
  availableProjects: Project[] = [];
  assignedProjects: ProjectAssigned[] = [];
  createdUser: UserCreate;
  isPasswordVisible: boolean = false;
  constructor(private userService: UserService, private projectService: ProjectService) { }
  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe(projects => {
      this.availableProjects = projects;
    })
  }
  onAddNewUser() {
    this.assignProjectsToUser();
    this.assignedProjects.map(p => delete p.projectName)
    this.newUser.removeControl('projectId');
    this.newUser.removeControl('costToClient')
    this.createdUser = {
      user: this.newUser.getRawValue(),
      projects: this.assignedProjects
    }
    this.userService.addUser(this.createdUser).subscribe();
  }
  onDeleteProject(project) {
    this.assignedProjects.splice(this.assignedProjects.findIndex(p => p.projectName === project.projectName), 1);
  }
  onAddNewProject() {
    this.assignProjectsToUser();
    this.newUser.get('projectId').patchValue(null);
    this.newUser.get('costToClient').patchValue(null);
  }
  assignProjectsToUser() {
    if (this.newUser.get('projectId').value) {
    this.assignedProjects.push({
      projectName: this.availableProjects.find(p => p.id === this.newUser.get('projectId').value).name,
      projectId: this.newUser.get('projectId').value,
      costToClientPerHour: this.newUser.get('costToClient').value
      });
    }
  }


  onShowPassword() {
    return this.isPasswordVisible = !this.isPasswordVisible;
  }
}
