import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { User, ProjectAssigned, UserUpdate, UserProjectsUpdate, UserProjectsDel } from '../models/user.model';
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
              <mat-option *ngFor="let project of chooseableProjects" [value]="project.projectId">{{ project.name }}</mat-option>
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
    password: new FormControl(null),
    costToCompanyPerHour: new FormControl(null, [Validators.required, Validators.min(0)]),
    role: new FormControl(null, Validators.required),
    projectId: new FormControl(null, Validators.required),
    costToClient: new FormControl(null, Validators.required),
  });
  availableProjects: ProjectAssigned[] = [];
  assignedProjects: ProjectAssigned[] = [];
  projectsToDelete: UserProjectsDel[] = [];
  chooseableProjects: ProjectAssigned[] = [];
  createdUser: UserUpdate;
  shifteableProject: ProjectAssigned[] = [];
  @Input() userToEdit: User;
  id: number;
  constructor(private userService: UserService, private projectService: ProjectService,
              private projectUserService: ProjectUsersService, private router: Router) { }
  ngOnInit(): void {
    this.id = this.userToEdit.id;
    this.editUser.get('password').disable()
    this.editUser.patchValue(this.userToEdit)
    this.shifteableProject = this.userToEdit.projects;
    console.log('shifteable nogonint', this.shifteableProject)
    if (this.userToEdit.projects.length > 0) {
      for (let i = 0; i < this.userToEdit.projects.length; i++) {
        this.assignedProjects.push({
          userId: this.id,
          projectId: this.userToEdit.projects[i].projectId,
          costToClientPerHour: this.userToEdit.projects[i].costToClientPerHour,
          name: this.userToEdit.projects[i].name
        })
      }
      this.projectService.fetchProjects().subscribe(projects => {
        for (let i = 0; i < projects.length; i++) {
          this.availableProjects.push({
            userId: this.id,
            projectId: projects[i].projectId,
            name: projects[i].name
          })
        }
        this.availableProjects.filter(availableP => {
          availableP.projectId
        });
      })
    } else {
      this.projectService.fetchProjects().subscribe(projects => {
        for (let i = 0; i < projects.length; i++) {
          this.availableProjects.push({
            userId: this.id,
            projectId: projects[i].projectId,
            name: projects[i].name
          })
        }
        this.chooseableProjects = this.availableProjects;
      })
    }
    console.log(this.availableProjects)
  }
  onDeleteProject(project) {

    const deleteProject: UserProjectsDel = {
      userId: this.id,
      projectId: project.projectId
    }
    this.chooseableProjects.push({
      projectId: project.projectId,
      name: project.name
    })
    this.projectsToDelete.push(deleteProject);

    this.assignedProjects.splice(this.assignedProjects.findIndex(p => p.name === project.name), 1);
  }
  onAddNewProject() {
    this.assignProjectsToUser();
    this.editUser.get('projectId').patchValue(null);
    this.editUser.get('costToClient').patchValue(null);
  }
  updateUser() {
    this.assignProjectsToUser()
    if (this.shifteableProject.length > 0) {
      this.shifteableProject.forEach(originalP => {
        let duplicateIndex = this.assignedProjects.findIndex(p => p.projectId === originalP.projectId);
        this.assignedProjects.splice(duplicateIndex, 1);
      })
    }
    /*   for (let i = 1; i < this.shifteableProject.length; i++) {
        for (let j = 0; j < this.assignedProjects.length; j++) {
          if (this.shifteableProject[i].projectId === this.assignedProjects[j].projectId || 
            this.shifteableProject[i].costToClientPerHour !== this.assignedProjects[i].costToClientPerHour) {
            
              this.assignedProjects.splice(j, 1);
          }
        }
      }   */

    this.editUser.removeControl('projectId')
    this.editUser.removeControl('costToClient')
    this.createdUser = {
      user: this.editUser.getRawValue()
    }
    this.assignedProjects.map(p => delete p.name)
    if (this.createdUser) {
      this.userService.updateUser(this.id, this.createdUser).subscribe(() => {
        this.router.navigate(['..', 'users'])
      })
    }
    const projectUpdate: UserProjectsUpdate = {
      deleted: this.projectsToDelete ? this.projectsToDelete : [],
      created: this.assignedProjects ? this.assignedProjects : []
    }
    console.log(projectUpdate, "RESPONSE")
    if (projectUpdate) {
      this.projectUserService.updateUsersProjects(projectUpdate).subscribe(() => {
        this.userService.updateUser(this.id, this.createdUser).subscribe();
        this.router.navigate(['..', 'users'])
      });
    }
  }
  assignProjectsToUser() {
    if (this.editUser.get('projectId').value && this.editUser.get('costToClient').value) {
      let index = this.chooseableProjects.findIndex(p => p.projectId === this.editUser.get('projectId').value)
      this.chooseableProjects.splice(index, 1);
      this.assignedProjects.push({
        userId: this.id,
        name: this.availableProjects.find(p => p.projectId === this.editUser.get('projectId').value).name,
        projectId: this.editUser.get('projectId').value,
        costToClientPerHour: this.editUser.get('costToClient').value
      })
    }
  }
}
