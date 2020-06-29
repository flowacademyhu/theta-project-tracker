import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NewUserModalComponent } from '../modals/new-user-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProjectUsersService } from '../services/projectUsers.service';

@Component({
  selector: 'app-users',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewUser()" mat-raised-button>{{'add-user' | translate}}</button>
        <mat-table [dataSource]="users" class="mat-elevation-z8">
            <ng-container matColumnDef="firstName">
                <mat-header-cell *matHeaderCellDef>{{ 'firstname' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.firstName }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="lastName">
            <mat-header-cell *matHeaderCellDef>{{'lastname' | translate}}</mat-header-cell>
            <mat-cell *matCellDef="let user">{{ user.lastName }}</mat-cell>
        </ng-container>
            <ng-container matColumnDef="role">
                <mat-header-cell *matHeaderCellDef>{{'role' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.role }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="cost">
                <mat-header-cell *matHeaderCellDef>{{'cost' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.costToCompanyPerHour }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="projects" >
                <mat-header-cell *matHeaderCellDef>{{'projects' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user"><p *ngFor="let project of user.projects">{{ project.name }}</p></mat-cell>
            </ng-container>
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">
                    <mat-icon (click)="onOpenEditModal(user)">edit</mat-icon>
                    <mat-icon (click)="onOpenDeleteModal(user)">clear</mat-icon>
                </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
        <mat-paginator
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons>
      </mat-paginator>
    </div>
    </mat-card>
  `,
  styles: [
    `
    .table-container {
      margin: auto;
      max-width: 70%;
      height: 450px;
      overflow: auto;
      margin-top: 200px
    }
    mat-icon:hover {
      cursor: pointer;
    }
    `]
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions$: Subscription[] = [];
  projectArrays: any[] = [];
  displayedColumns = ['firstName', 'lastName', 'role', 'cost', 'projects', 'actions'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog, private projectUserService: ProjectUsersService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.fetchUsers().subscribe((users) => {
      this.users = users;
      this.users.map(u => {
        this.projectUserService.getUsersProjects(u.id).subscribe(array => {
          u.projects = array
        })
      })
      console.log(this.users)
    });
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenDeleteModal(user) {
    const nameToPass = this.users.find(u => u.id === user.id).firstName + ' ' +
      this.users.find(u => u.id === user.id).lastName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      console.log(user.id)
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.updateDataSource();
        })
       
      }
    }));
  };


  onAddNewUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '60%',
      height: '80%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDataSource()

      }
      this.updateDataSource()
    }));
  }
  onOpenEditModal(user) {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '60%',
      height: '80%',
      data: { userToEdit: user }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDataSource()
      }
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
  updateDataSource() {
    this.userService.fetchUsers().subscribe(users => {
      this.users = users;
    });
  }
}