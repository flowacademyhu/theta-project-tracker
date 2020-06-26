import { Component, OnInit, OnDestroy } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import { MatDialog } from '@angular/material/dialog';
import { Milestone } from '../models/milestone.model';
import { Subscription } from 'rxjs';
import { NewMilestoneModalComponent } from '../modals/new-milestone-modal.component';
import { DeleteMilestoneComponent } from '../modals/delete-milestone.component';

@Component({
  selector: 'app-milestones',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewMilestone()" mat-raised-button>+ Add New Milestone</button>
        <mat-table class="mat-elevation-z8" [dataSource]="milestoneArrays">
            <ng-container matColumnDef="name">
                <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
                <mat-cell *matCellDef="let milestone">{{ milestone.name }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="project">
            <mat-header-cell *matHeaderCellDef>Project</mat-header-cell>
            <mat-cell *matCellDef="let milestone">{{ milestone.project }}</mat-cell>
        </ng-container>
            <ng-container matColumnDef="description">
                <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>
                <mat-cell *matCellDef="let milestone">{{ milestone.description }}</mat-cell>
            </ng-container>
            <ng-container matColumnDef="actions" class="actions">
                <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
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
  `,
  styles: [`
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
export class MilestonesComponent implements OnInit, OnDestroy {
  milestoneArrays: Milestone[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns = ['name', 'project', 'description', 'action'];

  constructor(private milestoneService: MilestoneService, private dialog: MatDialog) { }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.milestoneService.fetchMilestones().subscribe((milestones) => {
      this.milestoneArrays = milestones;
    });
  }
  onAddNewMilestone() {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.milestoneService.fetchMilestones().subscribe(data => {
        this.milestoneArrays = data;
      });
    });
  }
  onOpenDeleteModal(milestone) {
    const nameToPass = this.milestoneArrays.find(u => u.id === milestone.id).name;
    const dialogRef = this.dialog.open(DeleteMilestoneComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.milestoneService.deleteMilestone(milestone.id).subscribe();
      }
    });
  }
  onOpenEditModal(milestone) {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '60%',
      height: '80%',
      data: { milestoneToEdit: milestone }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.milestoneService.fetchMilestones().subscribe(milestones => {
          this.milestoneArrays = milestones;
        });
      }
    });
  }
}
