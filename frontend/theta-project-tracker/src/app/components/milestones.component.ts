import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import { MatDialog } from '@angular/material/dialog';
import { Milestone } from '../models/milestone.model';
import { Subscription } from 'rxjs';
import { NewMilestoneModalComponent } from '../modals/new-milestone-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-milestones',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewMilestone()" mat-raised-button color="primary">{{'add-milestone' | translate}}</button>
        <mat-table class="mat-elevation-z8" [dataSource]="dataSource">
            <ng-container matColumnDef="name">
                <mat-header-cell *matHeaderCellDef>{{'name' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let milestone">{{ milestone.name }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="project">
            <mat-header-cell *matHeaderCellDef>{{'projects' | translate}}</mat-header-cell>
            <mat-cell *matCellDef="let milestone">{{ milestone.projectName }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="description">
                <mat-header-cell *matHeaderCellDef>{{'description' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let milestone">{{ milestone.description }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="action" class="action">
            <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
            <mat-cell *matCellDef="let milestone">
                <mat-icon (click)="onOpenEditModal(milestone)">edit</mat-icon>
                <mat-icon (click)="onOpenDeleteModal(milestone)" color="warn">delete_forever</mat-icon>
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
  styles: [`
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
`]
})
export class MilestonesComponent implements OnInit, OnDestroy, AfterViewInit {
  milestones: Milestone[] = [];
  projects: Project[] = [];
  subscriptions$: Subscription[] = [];
  dataSource: MatTableDataSource<Milestone> = new MatTableDataSource<Milestone>();
  displayedColumns = ['name', 'project', 'description', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private milestoneService: MilestoneService, private dialog: MatDialog,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.milestoneService.fetchMilestones().subscribe((milestones) => {
      this.dataSource.data = milestones;
    });
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource.data.map(m => m.projectName = this.projects.find(p => p.id === m.projectId).name);
    });
  }
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onAddNewMilestone() {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '35%',
      height: '45%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  onOpenDeleteModal(milestone) {
    const nameToPass = this.dataSource.data.find(u => u.id === milestone.id).name;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '15%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.milestoneService.deleteMilestone(milestone.id).subscribe(() => {
          this.updateDataSource();
        });
      }
    }));
  }
  onOpenEditModal(milestone) {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '35%',
      height: '45%',
      data: { milestoneToEdit: milestone }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  updateDataSource() {
    this.milestoneService.fetchMilestones().subscribe(milestones => {
      this.dataSource.data = milestones;
      this.dataSource.data.map(m => m.projectName = this.projects.find(p => p.id === m.projectId).name);
    });
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
