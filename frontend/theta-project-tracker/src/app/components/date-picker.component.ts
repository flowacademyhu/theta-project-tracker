import { Component, OnInit, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatePickerService } from '../services/date-picker.service';
import { EventEmitter } from '@angular/core';
import { TimesheetService } from '../services/timsheet.service';

@Component({
  selector: 'app-date-picker',
  template: `
  <div class="container">
  <button  mat-raised-button (click)="onCopyLastWeek()">{{ 'copy-last-week' | translate }}</button>
  <mat-icon (click)="toPreviousWeek()">navigate_before</mat-icon>
  <mat-form-field appearance="fill">
  <mat-label>{{'choose-date' | translate}}</mat-label>
  <input   matInput [matDatepicker]="picker" (dateChange)="updateDoB($event)" [value]="currentDate.value">
  <mat-datepicker-toggle matSuffix [for]="picker" ></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<mat-icon (click)="toNextWeek()">navigate_next</mat-icon>
</div>
  `,
  styles: [`
  mat-icon:hover {
    cursor: pointer;
  }
  .container{
    text-align: center;
    margin-top: 50px;
    margin-left: -210px;
  }
  button {
    margin-right: 80px;
  }
  `]
})

export class DatePickerComponent implements OnInit {
  
  constructor(public datepipe: DatePipe, public datePickerService: DatePickerService, 
    private timesheetService: TimesheetService) { }
  newDate:Date
  date: Date;
  currentDate = {
    value : new Date()
  }
  @Output() dateEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() onCopy: EventEmitter<string> = new EventEmitter<string>();
  ngOnInit(): void {
    this.dateEmitter.emit(new Date().toISOString().split('T')[0])
  } 

  updateDoB(dateObject){
    this.currentDate.value = dateObject.value;
    let transform = this.datepipe.transform(dateObject.value, 'yyyy-MM-dd');
    this.dateEmitter.emit(transform)
     this.datePickerService.fetchCurrentWeek(transform);
   }
   toPreviousWeek() {
     this.currentDate.value = new Date(this.currentDate.value.setDate(this.currentDate.value.getDate() -7))
     this.updateDoB(this.currentDate)
   }
  toNextWeek() { 
    this.currentDate.value = new Date(this.currentDate.value.setDate(this.currentDate.value.getDate() + 7))
    this.updateDoB(this.currentDate)
  }
  onCopyLastWeek() {
    this.timesheetService.copyLastWeek().subscribe(() => {
      this.onCopy.emit();
    })
  }
}