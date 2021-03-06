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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewUser()" mat-raised-button color="primary">{{'add-user' | translate}}</button>
        <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <ng-container matColumnDef="name">
                <mat-header-cell *matHeaderCellDef>{{ 'name' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">{{ user.fullName }}</mat-cell>
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
                <mat-cell *matCellDef="let user"><p *ngFor="let project of user.projects">{{ project.name }}&emsp;</p></mat-cell>
            </ng-container>
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let user">
                    <mat-icon (click)="onOpenEditModal(user)">edit</mat-icon>
                    <mat-icon (click)="onOpenDeleteModal(user)" color="warn">delete_forever</mat-icon>
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
    min-height: auto;
    overflow: auto;
    margin-top: 100px;
    margin-bottom: 100px;
    }
    mat-icon:hover {
      cursor: pointer;
    }
    .mat-column-projects {
      flex: 0 0 35%;
    }
    .mat-column-name {
      flex: 0 0 20%;
    }
    .mat-column-role {
      flex: 0 0 15%;
    }
    .mat-column-cost {
      flex: 0 0 15%;
    }
    mat-icon:hover {
      cursor: pointer;
  }

    `]
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions$: Subscription[] = [];
  projectArrays: any[] = [];
  displayedColumns = ['name', 'role', 'cost', 'projects', 'actions'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog, private projectUserService: ProjectUsersService, 
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.userService.fetchUsers().subscribe((users) => {
      this.dataSource.data = users;
      this.dataSource.data.map(u => {
        this.projectUserService.getUsersProjects(u.id).subscribe(array => {
          u.projects = array;
        });
      });
      this.dataSource.data.map(u => u.fullName = u.firstName + ' ' + u.lastName);
    });
  }
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onOpenDeleteModal(user) {
    const nameToPass = this.dataSource.data.find(u => u.id === user.id).firstName + ' ' +
      this.dataSource.data.find(u => u.id === user.id).lastName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '20%',
      height: '15%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.updateDataSource();
        });
      }
    }));
  }
  onAddNewUser() {
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '30%',
      height: '80%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  onOpenEditModal(user) {
    this.router.navigate(['edit-user'], {
      relativeTo: this.route,
      queryParams: { userId: user.id }
    });
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '30%',
      height: '80%',
      data: { userToEdit: user }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['..', 'users']);
      this.updateDataSource();
    }));
  }
  updateDataSource() {
    this.userService.fetchUsers().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.data.map(u => {
        this.projectUserService.getUsersProjects(u.id).subscribe(array => {
          u.projects = array;
          u.fullName = u.firstName + ' ' + u.lastName;
        });
      });
    });
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}