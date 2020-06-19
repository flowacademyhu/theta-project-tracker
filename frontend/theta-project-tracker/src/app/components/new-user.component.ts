import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, ProjectAssigned } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
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
    <label for="password">Password</label>
    <div>
        <mat-form-field class="full-width">
            <input matInput type="text" formControlName="password">
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
                <td>{{project.costToClientPerHour}}</td>
                <td>
                    <mat-icon (click)="onDeleteProject(project)">clear</mat-icon>
                </td>
            </tr>
            <tr>
                <td>
                    <mat-form-field>
                        <mat-select formControlName="project">
                            <mat-option *ngFor="let project of availableProjects" value="{{ project }}">{{ project }}
                            </mat-option>
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
    <button (click)="onCloseDialog()" mat-raised-button [mat-dialog-close]="createdUser" color="warn">Save</button>
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
export class NewUserComponent implements OnInit, OnDestroy {
  subscriptions$: Subscription[] = [];
  constructor(private userService: UserService) { }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe())
  }
  newUser = new FormGroup({
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
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
      this.newUser.get('firstName').patchValue(this.userToEdit.firstName);
      this.newUser.get('lastName').patchValue(this.userToEdit.lastName);
      this.newUser.get('email').patchValue(this.userToEdit.email);
      this.newUser.get('cost').patchValue(this.userToEdit.costToCompanyPerHour);
      this.newUser.get('role').patchValue(this.userToEdit.role);
      this.newUser.get('password').patchValue(this.userToEdit.password);
    }
  }
  onAddNewUser() {
    this.assignProjectsToUser();
    this.createdUser = {
      firstName: this.newUser.getRawValue().firstName,
      lastName: this.newUser.getRawValue().lastName,
      email: this.newUser.getRawValue().email,
      costToCompanyPerHour: this.newUser.getRawValue().cost,
      role: this.newUser.getRawValue().role,
      password: this.newUser.getRawValue().password,
      /* projectAssigned: this.assignedProjects */
    };
    this.subscriptions$.push(this.userService.addUser(this.createdUser).subscribe(data => {
      console.log(data);
    }));
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
    this.userToEdit = {
      id: this.userToEdit.id,
      firstName: this.newUser.getRawValue().firstName,
      lastName: this.newUser.getRawValue().lastName,
      email: this.newUser.getRawValue().email,
      costToCompanyPerHour: this.newUser.getRawValue().cost,
      role: this.newUser.getRawValue().role,
      /*  projectAssigned: this.assignedProjects */
    }
    console.log(this.userToEdit)
    this.subscriptions$.push(this.userService.updateUser(this.userToEdit.id, this.userToEdit).subscribe(data => {
      console.log(data);
    }));
  }
  assignProjectsToUser() {
    /*    this.assignedProjects.push({
         projectName: this.newUser.get('project').value,
         costToClientPerHour: this.newUser.get('costToClient').value
       }); */
  }
  onCloseDialog() {
    if (this.userToEdit) {
      this.editUser();
    } else {
      this.onAddNewUser();
    }
  }
}



