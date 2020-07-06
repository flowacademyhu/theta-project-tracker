import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActionLabelService } from '../services/action-label.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionLabel } from '../models/action-label.model';
import { Subscription } from 'rxjs';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service'
import { NewActionLabelModalComponent } from '../modals/new-action-label-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-action-label',
  template: `
  <mat-card class="table-container">
  <div>
  <button (click)="onAddNewActionLabel()" mat-raised-button>+ Add New Action Label</button>
      <mat-table class="mat-elevation-z8" [dataSource]="dataSource">
          <ng-container matColumnDef="name">
              <mat-header-cell *matHeaderCellDef>{{ 'name' | translate }}</mat-header-cell>
              <mat-cell *matCellDef="let actionlabel">{{ actionlabel.name }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="project">
          <mat-header-cell *matHeaderCellDef>{{'projects' | translate}}</mat-header-cell>
          <mat-cell *matCellDef="let actionlabel">{{ actionlabel.projectName }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="action" class="action">
          <mat-header-cell *matHeaderCellDef>{{'actions' | translate }}</mat-header-cell>
          <mat-cell *matCellDef="let actionlabel">
             <button mat-mini-fab><mat-icon (click)="onOpenEditModal(actionlabel)">edit</mat-icon></button>
              <button mat-mini-fab color="primary"><mat-icon (click)="onOpenDeleteModal(actionlabel)">clear</mat-icon></button>
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
export class ActionLabelComponent implements OnInit, OnDestroy, AfterViewInit {

  dataSource: MatTableDataSource<ActionLabel> = new MatTableDataSource<ActionLabel>();
  projects: Project[] = [];
  actionlabel: ActionLabel[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns = ['name', 'project', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private actionLabelService: ActionLabelService, private dialog: MatDialog,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.actionLabelService.fetchActionLabels().subscribe((actionlabel) => {
      this.dataSource.data = actionlabel;
    });
    this.projectService.fetchProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource.data.map(a => a.projectName = this.projects.find(p => p.id === a.projectId).name);
    });
  }
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onAddNewActionLabel() {
    const dialogRef = this.dialog.open(NewActionLabelModalComponent, {
      width: '35%',
      height: '40%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  onOpenEditModal(actionlabel) {
    const dialogRef = this.dialog.open(NewActionLabelModalComponent, {
      width: '35%',
      height: '40%',
      data: { actionLabelToEdit: actionlabel }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
      this.updateDataSource();
    }));
  }
  onOpenDeleteModal(actionlabel) {
    const nameToPass = this.dataSource.data.find(a => a.projectId === actionlabel.projectId).name;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '15%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actionLabelService.deleteActionLabel(actionlabel.id).subscribe(() => {
          this.updateDataSource();
        });
      }
    }));
  }
  updateDataSource() {
    this.actionLabelService.fetchActionLabels().subscribe(actionlabels => {
      this.dataSource.data = actionlabels;
      this.dataSource.data.map(a => a.projectName = this.projects.find(p => p.id === a.projectId).name);
    });
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
