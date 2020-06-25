import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, ProjectAssigned } from '../models/user.model';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-new-user',
  template: `
  <form [formGroup]="newUser">
  <label for="name">{{ 'Firstname' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="firstName">
    </mat-form-field>
  </div>
  <label for="name">{{'Lastname' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="lastName">
    </mat-form-field>
  </div>
  <label for="email">{{'Email' | translate}}</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="email">
    </mat-form-field>
  </div>
  <label for="cost">{{'Cost' | translate}}</label>
  <div>
    <mat-form-field class="cost">
      <input matInput type="number" formControlName="cost">
    </mat-form-field>
  </div>
  <label for="role">{{'Role' | translate}}</label>
  <div>
    <mat-form-field>
      <mat-select formControlName="role">
        <mat-option value="user">{{'User' | translate}}</mat-option>
        <mat-option value="admin">{{'Admin' | translate}}</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <label>{{'ProjectsAssigned' | translate}}</label>
  <div>
    <table>
      <tr>
        <th>{{"ProjectName" | translate}}</th>
        <th>{{"CostToClient" | translate}}</th>
        <th>{{"Unassign" | translate}}</th>
      </tr>
      <tr *ngFor="let project of assignedProjects; let i = index">
        <td>{{project.projectName}}</td>
        <td>{{project.userCostPerHour}}</td>
        <td>
          <mat-icon (click)="onDeleteProject(project)">clear</mat-icon>
        </td>
      </tr>
      <tr>
        <td>
          <mat-form-field>
            <mat-select formControlName="project">
              <mat-option *ngFor="let project of availableProjects" value="{{ project }}">{{ project }}</mat-option>
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
    <button mat-raised-button (click)="onAddNewProject()">{{"Add" | translate}}</button>
  </div>
</form>
<div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{"Cancel" | translate}}</button>
  <button (click)="onAddNewUser()" mat-raised-button [mat-dialog-close]="createdUser" color="warn">{{"Save" | translate}}</button>
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
    `
  ]
})
export class NewUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  newUser = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    lastName: new FormControl(null, [Validators.required, Validators.pattern(/^\S*$/)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    cost: new FormControl(null, [Validators.required, Validators.min(0)]),
    role: new FormControl(null, Validators.required),
    project: new FormControl(null, Validators.required),
    costToClient: new FormControl(null, Validators.required),
  })
  availableProjects = ['Project0', 'Project1', 'Project2', 'Project3'];
  assignedProjects: ProjectAssigned[] = [];
  createdUser: User;
  @Input() userToEdit: User;

  ngOnInit(): void {
    if (this.userToEdit) {
      this.assignedProjects = this.userToEdit.projectAssigned;
      this.newUser.patchValue(this.userToEdit)
    }
  }
  onAddNewUser() {
    this.assignProjectsToUser();
    this.createdUser = this.newUser.getRawValue();
    this.userService.addUser(this.createdUser);
  }
  onDeleteProject(project) {
    this.assignedProjects.splice(this.assignedProjects.findIndex(p => p.projectName === project.projectName), 1);
  }
  onAddNewProject() {
    this.assignProjectsToUser();
    this.newUser.get('project').patchValue(null);
    this.newUser.get('costToClient').patchValue(null);
  }
  editUser() {
    this.userToEdit = this.newUser.getRawValue()
    this.userService.updateUser(this.userToEdit.id, this.userToEdit);
  }
  assignProjectsToUser() {
    this.assignedProjects.push({
      projectName: this.newUser.get('project').value,
      userCostPerHour: this.newUser.get('costToClient').value
    });
  }
  onCloseDialog() {
    if (this.userToEdit) {
      this.editUser();
    } else {
      this.onAddNewUser()
    }
  }
}

