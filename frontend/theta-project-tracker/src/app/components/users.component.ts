import { Component, OnInit } from '@angular/core';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { NewUserModalComponent } from '../modals/new-user-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  template: `
  <div class="table-container">
  <button (click)="onAddNewUser()" mat-raised-button #newUser color="primary">+ Add New User</button>
  <mat-card>
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
                <mat-cell *matCellDef="let user">{{ user.costToCompanyPerHour }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="projects" >
                <mat-header-cell *matHeaderCellDef>Projects</mat-header-cell>
                <mat-cell *matCellDef="let user" > <p *ngFor="let project of user.projectAssigned">{{ project.projectName }}</p></mat-cell>
            </ng-container>
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
                <mat-cell *matCellDef="let user">
                    <mat-icon (click)="onOpenEditModal(user)">edit</mat-icon>
                    <mat-icon (click)="onOpenDeleteModal(user)">clear</mat-icon>
                </mat-cell>
            </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
</mat-card>
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
  #newUser {
    margin-bottom: 5px;
  }
  `]
})
export class UsersComponent implements OnInit {

  projectArrays: any[] = [];
  displayedColumns = ['firstName', 'lastName', 'role', 'cost', 'projects', 'actions'];
  dataSource: User[] = [];

  constructor(private userService: UserService, private dialog: MatDialog, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.fetchUsers().subscribe(data => {
      this.dataSource = data;
    })
  }

  onOpenDeleteModal(user) {
    const nameToPass = user.firstName + ' ' + user.lastName;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe(() => {
          this.userService.fetchUsers().subscribe(data => {
            this.dataSource = data;
          })
        });
      }
    });
  }

  onOpenEditModal(user) {
    this.router.navigate(['edit-user'], {
      relativeTo: this.route,
      queryParams: { id: user.id }
    })
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '60%',
      height: '80%',
      data: { userToEdit: user }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.fetchUsers().subscribe(data => {
        this.dataSource = data;
      })
    });
  }

  onAddNewUser() {
    this.router.navigate(['add-new'], {
      relativeTo: this.route
    })
    const dialogRef = this.dialog.open(NewUserModalComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.userService.fetchUsers().subscribe(data => {
        this.dataSource = data;
      })
    });
  }
}
