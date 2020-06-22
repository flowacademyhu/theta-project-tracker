import { Component, OnInit } from '@angular/core';
import { MilestoneService } from '../services/milestone.service';
import { MatDialog } from '@angular/material/dialog';
import { Milestone } from '../models/milestone.model';
import { Subscription } from 'rxjs';
import { NewMilestoneModalComponent } from '../modals/new-milestone-modal.component'

@Component({
  selector: 'app-milestones',
  template: `
  <mat-card class="table-container">
    <div>
    <button (click)="onAddNewMilestone()" mat-raised-button>+ Add New Milestone</button>
        <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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
export class MilestonesComponent implements OnInit {
  dataSource: Milestone[] = [];
  milestoneArrays: any[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns= ['name', 'project', 'description', 'action']

  constructor(private milestoneService: MilestoneService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions$.push(this.milestoneService.milestones$.subscribe(milestones => {
      this.dataSource = milestones;
    }))
  }
  onAddNewMilestone() {
    const dialogRef = this.dialog.open(NewMilestoneModalComponent, {
      width: '60%',
      height: '80%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
