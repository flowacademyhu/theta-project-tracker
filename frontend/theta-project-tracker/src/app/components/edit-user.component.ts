import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { User, ProjectAssigned, UserUpdate } from '../models/user.model';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';
import { ProjectUsersService } from '../services/projectUsers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  template: `
  <form [formGroup]="editUser">
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
      <input matInput type="text" formControlName="password">
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
      <tr *ngFor="let project of assignedProjects">
        <td>{{project.name}}</td>
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
    <button mat-raised-button (click)="onAddNewProject()">{{'add' | translate}}</button>
  </div>
</form>
<div class="actions" align="end">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button class="second" (click)="updateUser()" mat-raised-button [mat-dialog-close]="createdUser"
    color="primary">{{'save' | translate}}</button>
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

export class EditUserComponent implements OnInit {
  editUser = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    costToCompanyPerHour: new FormControl(null, [Validators.required, Validators.min(0)]),
    role: new FormControl(null, Validators.required),
    projectId: new FormControl(null, Validators.required),
    costToClient: new FormControl(null, Validators.required),
  });
  availableProjects: Project[] = [];
  assignedProjects: ProjectAssigned[] = [];
  createdUser: UserUpdate;
  @Input() userToEdit: User;
  id: number;
  constructor(private userService: UserService, private projectService: ProjectService,
              private projectUserService: ProjectUsersService, private router: Router) { }
  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe(projects => {
      this.availableProjects = projects;
    })
    this.id = this.userToEdit.id;
    this.editUser.get('password').disable()
    this.assignedProjects = this.userToEdit.projects;
    this.editUser.patchValue(this.userToEdit)
    this.projectUserService.unAssignProject(this.id, this.assignedProjects).subscribe();
  }
  onDeleteProject(project) {
    this.assignedProjects.splice(this.assignedProjects.findIndex(p => p.name === project.name), 1);
  }
  onAddNewProject() {
    this.assignProjectsToUser();
    this.editUser.get('projectId').patchValue(null);
    this.editUser.get('costToClient').patchValue(null);
  }
  updateUser() {
    this.assignProjectsToUser()
    this.editUser.removeControl('projectId')
    this.editUser.removeControl('costToClient')
    this.createdUser = {
      user: this.editUser.getRawValue()
    }
    this.assignedProjects.map(p => delete p.name)
    this.projectUserService.assignProjectToUser(this.id, this.assignedProjects).subscribe()
    this.userService.updateUser(this.id, this.createdUser).subscribe();
    this.router.navigate(['..', 'users'])
  }
  assignProjectsToUser() {
    if (this.editUser.get('projectId').value) {
      this.assignedProjects.push({
        name: this.availableProjects.find(p => p.id === this.editUser.get('projectId').value).name,
        projectId: this.editUser.get('projectId').value,
        costToClientPerHour: this.editUser.get('costToClient').value
      })
    }
  }
}
