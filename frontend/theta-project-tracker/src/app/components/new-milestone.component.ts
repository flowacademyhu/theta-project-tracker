import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Milestone } from '../models/milestone.model';
import { MilestoneService } from '../services/milestone.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-milestone',
  template:`
  <form [formGroup]="newMilestone">
  <label for="name">Name</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="firstName">
    </mat-form-field>
  </div>
  <label for="name">Project</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="lastName">
    </mat-form-field>
  </div>
  <label for="email">Description</label>
  <div>
    <mat-form-field class="full-width">
      <input matInput type="text" formControlName="email">
    </mat-form-field>
  </div>
  
  `,
})
export class NewMilestoneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
