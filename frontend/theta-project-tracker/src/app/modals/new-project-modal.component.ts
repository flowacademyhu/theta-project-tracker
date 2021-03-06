import { Component, OnInit, Inject } from '@angular/core';
import { Project } from '../models/project.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-project-modal',
  template:`
  <h2 mat-dialog-title><strong>{{message}}</strong></h2>
  <mat-dialog-content class="mat-typography">
    <app-new-project [projectToEdit]="projectToEdit"></app-new-project>
  </mat-dialog-content>
  `,
  styles: [`
  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `]
})
export class NewProjectModalComponent implements OnInit {

  projectToEdit: Project;
  message = "Add New Project";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    if (data) {
      this.projectToEdit = data.projectToEdit;
    }
  }

  ngOnInit(): void {
    if (this.projectToEdit) {
      this.message = "Edit Project";
    }
  }
}