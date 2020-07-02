import { Component, OnInit, OnDestroy } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import { MatDialog } from '@angular/material/dialog';
import { Milestone } from '../models/milestone.model';
import { Subscription } from 'rxjs';
import { NewMilestoneModalComponent } from '../modals/new-milestone-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { ProjectService } from '../services/project.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'app-milestones',
  template: `
  <body>
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewMilestone()" mat-raised-button>{{'add-milestone' | translate}}</button>
        <mat-table class="mat-elevation-z8" [dataSource]="milestoneArrays">
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
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
                <mat-cell *matCellDef="let milestone">
                <mat-icon>edit</mat-icon>
                    <mat-icon >clear</mat-icon>
                </mat-cell>
            </ng-container>
            <ng-container matColumnDef="action" class="action">
            <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
            <mat-cell *matCellDef="let milestone">
                <mat-icon (click)="onOpenEditModal(milestone)">edit</mat-icon>
                <mat-icon (click)="onOpenDeleteModal(milestone)">clear</mat-icon>
            </mat-cell>
        </ng-container>
            <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
            <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
        </mat-table>
    </div>
</mat-card>
</body>
  `,
  styles: [
    `
    body {
      height: 777px;
    }
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
export class MilestonesComponent implements OnInit, OnDestroy {
  milestoneArrays: Milestone[] = [];
  projects: Project[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns = ['name', 'project', 'description', 'action'];

  constructor(private milestoneService: MilestoneService, private dialog: MatDialog,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    console.log('macskaaaa')
    this.milestoneService.fetchMilestones().subscribe((milestones) => {
      this.milestoneArrays = milestones;
      console.log(this.milestoneArrays)
    });
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
      this.milestoneArrays.map(m => m.projectName = this.projects.find(p => p.id === m.projectId).name)
    })
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  onAddNewMilestone() {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '35%',
      height: '50%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  onOpenDeleteModal(milestone) {
    const nameToPass = this.milestoneArrays.find(u => u.id === milestone.id).name;
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
      height: '50%',
      data: { milestoneToEdit: milestone }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  updateDataSource() {
    this.milestoneService.fetchMilestones().subscribe(milestones => {
      this.milestoneArrays = milestones;
      this.milestoneArrays.map(m => m.projectName = this.projects.find(p => p.id === m.projectId).name)
    })
  }
}
