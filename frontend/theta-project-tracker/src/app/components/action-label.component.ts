import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActionLabelService } from '../services/action-label.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionLabel } from '../models/action-label.model';
import { Subscription } from 'rxjs';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service'
import { NewActionLabelModalComponent } from '../modals/new-action-label-modal.component';
import { DeleteModalComponent } from '../modals/delete-modal.component';

@Component({
  selector: 'app-action-label',
  template: `
  <mat-card class="table-container">
  <div>
  <button (click)="onAddNewActionLabel()" mat-raised-button>+ Add New Action Label</button>
      <mat-table class="mat-elevation-z8" [dataSource]="actionLabelArrays">
          <ng-container matColumnDef="name">
              <mat-header-cell *matHeaderCellDef>Name</mat-header-cell>
              <mat-cell *matCellDef="let actionlabel">{{ actionlabel.name }}</mat-cell>
          </ng-container>
          <ng-container matColumnDef="project">
          <mat-header-cell *matHeaderCellDef>{{'projects' | translate}}</mat-header-cell>
          <mat-cell *matCellDef="let projects">{{ projects.name }}</mat-cell>
      </ng-container>
          <ng-container matColumnDef="actions" class="actions">
              <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
              <mat-cell *matCellDef="let actionlabel">
              <mat-icon>edit</mat-icon>
                  <mat-icon >clear</mat-icon>
              </mat-cell>
          </ng-container>
          <ng-container matColumnDef="action" class="action">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let actionlabel">
              <mat-icon (click)="onOpenEditModal(actionlabel)">edit</mat-icon>
              <mat-icon (click)="onOpenDeleteModal(actionlabel)">clear</mat-icon>
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
export class ActionLabelComponent implements OnInit, OnDestroy {

  actionLabelArrays: ActionLabel[] = [];
  projects: Project[] = [];
  subscriptions$: Subscription[] = [];
  displayedColumns = ['name', 'project', 'action'];

  constructor(private actionLabelService: ActionLabelService, private dialog: MatDialog,
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.actionLabelService.fetchActionLabels().subscribe((actionlabel) => {
      this.actionLabelArrays = actionlabel;
      console.log(this.actionLabelArrays)
    });
      this.projectService.fetchProjects().subscribe(projects => {
        this.projects = projects;
        console.log(this.projects);
/*         this.actionLabelArrays.map(a => a.name = this.projects.find(p => p.id === a.projectId).name)
 */      }) 
  }

    ngOnDestroy(): void {
      this.subscriptions$.forEach(sub => sub.unsubscribe());
    }

    onAddNewActionLabel() {
      const dialogRef = this.dialog.open(NewActionLabelModalComponent, {
        width: '60%',
        height: '80%'
      });
      this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
        this.updateDataSource();
      }));
    }
    onOpenEditModal(actionlabel) {
      const dialogRef = this.dialog.open(NewActionLabelModalComponent, {
        width: '60%',
        height: '80%',
        data: { actionLabelToEdit: actionlabel }
      });
      this.subscriptions$.push(dialogRef.afterClosed().subscribe(() => {
        this.updateDataSource();
      }));
    }
    onOpenDeleteModal(actionlabel) {
      const nameToPass = this.actionLabelArrays.find(a => a.projectId === actionlabel.projectId).name;
      const dialogRef = this.dialog.open(DeleteModalComponent, {
        data: { name: nameToPass },
        width: '25%',
        height: '25%'
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
    this.actionLabelService.fetchActionLabels().subscribe(actionlabels  => {
      this.actionLabelArrays = actionlabels;
     /*  this.actionLabelArrays.map(a => a.name = this.projects.find(p => p.id === a.projectId).name) */
    })
  }
}
