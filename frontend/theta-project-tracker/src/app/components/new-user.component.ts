import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, ProjectAssigned } from '../models/user.model';
import { UserService } from '../services/user.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-new-user',
  template: `
  <form [formGroup]="newUser">
  <label for="name">First Name</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="firstName">
    </mat-form-field>
  </div>
  <label for="name">Last Name</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="lastName">
    </mat-form-field>
  </div>
  <label for="email">E-mail</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="email">
    </mat-form-field>
  </div>
  <label for="cost">Cost (£/h)</label>
  <div>
    <mat-form-field class="cost">
      <input matInput type="number" formControlName="cost">
    </mat-form-field>
  </div>
  <label for="role">Role</label>
  <div>
    <mat-form-field>
      <mat-select formControlName="role">
        <mat-option value="user">User</mat-option>
        <mat-option value="admin">Admin</mat-option>
      </mat-select>
    </mat-form-field>
  </div>
  <label>Project(s) Assigned</label>
  <div>
    <table>
      <tr>
        <th>Project name</th>
        <th>Cost to Client (£/h)</th>
        <th>Unassign</th>
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
    <button mat-raised-button (click)="onAddNewProject()">Add New</button>
  </div>
</form>
<div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">Cancel</button>
  <button (click)="onAddNewUser()" mat-raised-button [mat-dialog-close]="createdUser" color="warn">Save</button>
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
    `
  ]
})
export class NewUserComponent implements OnInit {

  constructor(private userService: UserService) { }
  newUser: FormGroup;
  availableProjects = ['Project0', 'Project1', 'Project2', 'Project3'];
  assignedProjects: ProjectAssigned[] = [];
  createdUser: User;
  emitter: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit(): void {
    this.newUser = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      cost: new FormControl(null, [Validators.required, Validators.min(0)]),
      role: new FormControl(null, [Validators.required]),
      project: new FormControl(null),
      costToClient: new FormControl(null),
    })
  }

  onAddNewUser() {
    this.assignedProjects.push({projectName: this.newUser.get('project').value, userCostPerHour: this.newUser.get('costToClient').value})
    this.createdUser = {
      firstName: this.newUser.getRawValue().firstName,
      lastName: this.newUser.getRawValue().lastName,
      email: this.newUser.getRawValue().email,
      userCostToCompanyPerHour: this.newUser.getRawValue().cost,
      role: this.newUser.getRawValue().role,
      projectAssigned: this.assignedProjects
    };
    this.emitter.emit(this.createdUser);
    console.log(this.createdUser)
    this.userService.addUser(this.createdUser);
  }
  onDeleteProject(project) {
    this.assignedProjects.splice(this.assignedProjects.findIndex(p => p.projectName === project.projectName), 1);
  }
  onAddNewProject() {
    this.assignedProjects.push({projectName: this.newUser.get('project').value, userCostPerHour: this.newUser.get('costToClient').value})
    this.newUser.get('project').patchValue(null);
    this.newUser.get('costToClient').patchValue(null);
  }









}

