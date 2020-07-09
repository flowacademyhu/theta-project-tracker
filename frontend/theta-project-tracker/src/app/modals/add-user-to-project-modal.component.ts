import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { User, ProjectAssigned } from '../models/user.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ProjectUsersService } from '../services/projectUsers.service'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-add-user-to-project-modal',
  template:`
  <form [formGroup]="newUser">
  <h2 mat-dialog-title><strong>{{'new-user' | translate}}</strong></h2>
  <mat-dialog-content class="mat-typography">
  <label for="name">{{'name' | translate}}</label>
  <div>
  <mat-form-field [formGroup]="newUser">
    <mat-select class="full-width" formControlName="user">
      <mat-option *ngFor="let user of users" [value]="user">{{ user }}</mat-option>
    </mat-select>
    </mat-form-field>
  </div>
  <div>
  <label for="costToClientPerHour">{{'cost-to-client' | translate}}</label>
  <mat-form-field class="full-width">
    <input matInput type="number" formControlName="costToClientPerHour" [value]="costToClientPerHour">
  </mat-form-field>
</div>
  </mat-dialog-content>
  <div class="actions">
  <button mat-raised-button mat-dialog-close color="accent">{{'cancel' | translate}}</button>
  <button (click)="onAddNewUser()" mat-raised-button [mat-dialog-close]="availableUsers" color="warn">{{'add' | translate}}</button>
</div>
</form>
  `,
  styles: [`
  .full-width {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }
  `]
 })

export class AddUserToProjectModalComponent implements OnInit { 

  constructor(private userService: UserService, private projectUsersService: ProjectUsersService, @Inject(MAT_DIALOG_DATA) public data: any ) {
    if (data) {
      this.project = data.projectToEdit
    }
  }
  subscriptions$: Subscription[] = [];
  availableUsers: User[] = [];
  filteredUsers: User[] = [];
  users: string[] = [];
  costToClientPerHour: number;
  @Input() project: Project;
  projects: ProjectAssigned[] = [];
  newUser = new FormGroup({
    user: new FormControl(null, Validators.required),
    costToClientPerHour: new FormControl(null, Validators.required)
  })  

  ngOnInit(): void {
    this.subscriptions$.push(this.userService.fetchUsers().subscribe(users => {
      this.availableUsers = users;
      this.availableUsers.forEach(u => {
        this.projectUsersService.getUsersProjects(u.id).subscribe(projects => {
          if (!projects.find(p => p.projectId === this.project.id)) {
            this.filteredUsers.push(u);
            this.users = this.filteredUsers.map(u => u.firstName + ' ' + u.lastName);
          }
        })
      })
    }));
  }

  onAddNewUser() {
    let chosen = this.filteredUsers.find(u  => u.firstName + ' ' + u.lastName === this.newUser.get('user').value)
   this.projectUsersService.assignProjectToUser(chosen.id,  [{projectId: this.data.projectToEdit.id, costToClientPerHour: this.newUser.value.costToClientPerHour}]).subscribe();
  }
}
