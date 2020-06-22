import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NewUserModalComponent } from '../modals/new-user-modal.component';

@Component({
  selector: 'app-users',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewUser()" mat-raised-button>+ Add New User</button>
        <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <ng-container matColumnDef="firstName">
                <mat-header-cell *matHeaderCellDef>First Name</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.firstName }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="lastName">
            <mat-header-cell *matHeaderCellDef>Last Name</mat-header-cell>
            <mat-cell *matCellDef="let user">{{ user.lastName }}</mat-cell>
        </ng-container>
            <ng-container matColumnDef="role">
                <mat-header-cell *matHeaderCellDef>Role</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.role }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="cost">
                <mat-header-cell *matHeaderCellDef>Cost (£/h)</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.userCostToCompanyPerHour }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="projects" >
                <mat-header-cell *matHeaderCellDef>Projects</mat-header-cell>
                <mat-cell *matCellDef="let user" > <p *ngFor="let project of user.projectAssigned">{{ project.projectName }}</p></mat-cell>
            </ng-container>
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
                <mat-cell *matCellDef="let user">
                    <mat-icon>edit</mat-icon>
                    <mat-icon (click)="onOpenDeleteModal(user)">clear</mat-icon>
                </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
    </div>
  `,
  styles: [
    `
    .table-container {
      margin: auto;
      max-width: 70%;
      height: 400px;
      overflow: auto;
      margin-top: 200px
  }
  mat-icon:hover {
      cursor: pointer;
  }
  `]
})
export class UsersComponent implements OnInit, OnDestroy {

  subscriptions$: Subscription[] = [];
  projectArrays: any[] = [];
  displayedColumns = ['firstName', 'lastName', 'role', 'cost', 'projects', 'actions'];
  dataSource: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog) { }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.userService.users$.subscribe(users => {
      this.dataSource = users;
    }));
  }

  onOpenDeleteModal(user) {
    const nameToPass = this.dataSource.find(u => u.id === user.id).firstName + ' ' +
      this.dataSource.find(u => u.id === user.id).lastName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id);

      }
    });
  }

  onAddNewUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
