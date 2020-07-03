import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-record-one-week',
  template: `
  <div class="wrapper">
  <mat-grid-list cols="30" rowHeight="100px">
    <mat-grid-tile class="tile" [colspan]="3" [rowspan]="1"><strong>{{project}}</strong>
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="3" [rowspan]="1">
      <p>{{ milestone }}</p>
      <p>{{ activity }}</p>
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="1" [rowspan]="1">
      <mat-icon>sms</mat-icon>
    </mat-grid-tile>
    <mat-grid-tile class="tile" *ngFor="let day of days" [colspan]="day.cols" [rowspan]="day.rows">
      <form [formGroup]="timeSheet">
        <mat-form-field appearance="outline" formGroupName="normalHours">
          <input type="number" matInput formControlName="{{ day.name }}">
        </mat-form-field>
        <mat-form-field appearance="outline" color="warn" formGroupName="overTime">
          <input type="number" matInput placeholder="OT" formControlName="{{ day.name }}">
        </mat-form-field>
      </form>
    </mat-grid-tile>
    <mat-grid-tile class="tile" [colspan]="2" [rowspan]="1">
      <button mat-icon-button>
        <mat-icon (click)="onDeleteProject()">clear</mat-icon>
      </button>
      <button mat-icon-button (click)="getDailyHours()">
        <mat-icon>save</mat-icon>
      </button>
    </mat-grid-tile>
  </mat-grid-list>
</div>
  `,
  styles: [`
  mat-form-field {
    width: 50px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
   .wrapper {
    margin: auto;
    width: 80%;
    overflow: auto;
  }
  `]
})
export class RecordOneWeekComponent implements OnInit {
  @Input() project: string;
  @Input() milestone: string;
  @Input() activity: string;
  days = [
    { cols: 3, rows: 1, name: 'monday' },
    { cols: 3, rows: 1, name: 'tuesday' },
    { cols: 3, rows: 1, name: 'wednesday' },
    { cols: 3, rows: 1, name: 'thursday' },
    { cols: 3, rows: 1, name: 'friday' },
    { cols: 3, rows: 1, name: 'saturday' },
    { cols: 3, rows: 1, name: 'sunday' },
  ];
  @Output() projectEmitter: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() projectToDelete: EventEmitter<string> = new EventEmitter<string>();
  timeSheet = new FormGroup({
    normalHours: new FormGroup({
      monday: new FormControl(null),
      tuesday: new FormControl(),
      wednesday: new FormControl(),
      thursday: new FormControl(),
      friday: new FormControl(),
      saturday: new FormControl(),
      sunday: new FormControl(),
    }),
    overTime: new FormGroup({
      monday: new FormControl(),
      tuesday: new FormControl(),
      wednesday: new FormControl(),
      thursday: new FormControl(),
      friday: new FormControl(),
      saturday: new FormControl(),
      sunday: new FormControl(),
    })
  })
  constructor() { }
  ngOnInit(): void {
  }
  getDailyHours() {
    let projectTotal = {
      name: this.project,
      normalHours: this.timeSheet.get('normalHours').value,
      overTime: this.timeSheet.get('overTime').value
    }
    this.projectEmitter.emit(projectTotal);
  }
  onDeleteProject() {
    this.projectToDelete.emit(this.project);
  }
}
