import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { NewProjectModalComponent } from '../modals/new-project-modal.component';
import { DeleteProjectModalComponent } from '../modals/delete-project-modal.component';

@Component({
  selector: 'app-projects',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewProject()" mat-raised-button>+ Add New Project</button>
    <mat-table class="mat-elevation-z8" [dataSource]="dataSource">
    <ng-container matColumnDef="actions" class="actions">
    <ng-container matColumnDef="name">
    <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
    <mat-cell *matCellDef="let project">{{ project.name }}</mat-cell>
</ng-container>
    <ng-container matColumnDef="client">
        <mat-header-cell *matHeaderCellDef>Client</mat-header-cell>
        <mat-cell *matCellDef="let project">{{ project.client }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="description">
        <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>
        <mat-cell *matCellDef="let project">{{ project.description }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="budget">
        <mat-header-cell *matHeaderCellDef>Budget</mat-header-cell>
        <mat-cell *matCellDef="let project">{{ project.budget }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="action" class="action">
        <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
        <mat-cell *matCellDef="let project">
            <mat-icon (click)="onOpenEditModal(project)">edit</mat-icon>
            <mat-icon (click)="onOpenDeleteModal(project)">clear</mat-icon>
        </mat-cell>
    </ng-container>
    </ng-container>
    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
    </mat-table>
</div>
</mat-card>
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
    `
  ]
})
export class ProjectsComponent implements OnInit, OnDestroy {

  constructor(private projectService: ProjectService, private dialog: MatDialog) { }

  dataSource: Project[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns= ['name', 'client', 'description', 'budget', 'action']

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.projectService.projects$.subscribe(projects => {
      this.dataSource = projects;
    }))
  }

  onAddNewProject() {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
 
   onOpenDeleteModal(project) {
    const nameToPass = this.dataSource.find(u => u.id === project.id).name;
    const dialogRef = this.dialog.open(DeleteProjectModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(project.id);
      }
    });
  } 

  onOpenEditModal(project) {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '60%',
      height: '80%',
      data: { projectToEdit: project }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
      }
    });
  }}