import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { NewProjectModalComponent } from '../modals/new-project-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-projects',
  template: `
  <mat-card class="table-container">
    <div>
     <button (click)="onAddNewProject()" mat-raised-button>{{'add-project' | translate}}</button>
     <mat-table class="mat-elevation-z8" [dataSource]="projects">
    <ng-container matColumnDef="actions" class="actions">
      <ng-container matColumnDef="name">
        <mat-header-cell *matHeaderCellDef>{{'name' | translate}}</mat-header-cell>
        <mat-cell *matCellDef="let project">{{ project.name }}</mat-cell>
      </ng-container>
     <ng-container matColumnDef="client">
      <mat-header-cell *matHeaderCellDef>{{'clients' | translate}}</mat-header-cell>
      <mat-cell *matCellDef="let project">{{ project.clientName }}</mat-cell>
     </ng-container>
     <ng-container matColumnDef="description">
      <mat-header-cell *matHeaderCellDef>{{'description' | translate}}</mat-header-cell>
      <mat-cell *matCellDef="let project">{{ project.description }}</mat-cell>
     </ng-container>
    <ng-container matColumnDef="budget">
      <mat-header-cell *matHeaderCellDef>{{'budget' | translate}}</mat-header-cell>
      <mat-cell *matCellDef="let project">{{ project.budget }}</mat-cell>
    </ng-container>
    <ng-container matColumnDef="action" class="action">
      <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
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

  constructor(private projectService: ProjectService, private dialog: MatDialog, private clientService: ClientService) { }

  projects: Project[] = [];
  clients: Client[];
  subscriptions$: Subscription[] = [];
  displayedColumns = ['name', 'client', 'description', 'budget', 'action'];

  ngOnInit(): void {
    this.projectService.fetchProjects().subscribe((projects) => {
      this.projects = projects;
    });
    this.clientService.fetchClients().subscribe(clients => {
      this.clients = clients;
      this.projects.map(p => p.clientName = this.clients.find(c => c.id === p.clientId).name)
    })
  }

  onAddNewProject() {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '60%',
      height: '80%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }

  onOpenDeleteModal(project) {
    const nameToPass = this.projects.find(u => u.id === project.id).name;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(project.id).subscribe(() => {
          this.updateDataSource();
        });

      }
    }));
  }

  onOpenEditModal(project) {
    const dialogRef = this.dialog.open(NewProjectModalComponent, {
      width: '60%',
      height: '80%',
      data: { projectToEdit: project }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource()
    }));
  }
  updateDataSource() {
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
      this.projects.map(p => p.clientName = this.clients.find(c => c.id === p.clientId).name)
    })
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
