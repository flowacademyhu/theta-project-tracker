import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatePickerService } from '../services/date-picker.service';

@Component({
  selector: 'app-date-picker',
  template: `
  <div class="container">
  <mat-icon (click)="toPreviousWeek()">navigate_before</mat-icon>
  <mat-form-field appearance="fill">
  <mat-label>Choose a date</mat-label>
  <input   matInput [matDatepicker]="picker" (dateChange)="updateDoB($event)" [value]="currentDate.value">
  <mat-datepicker-toggle matSuffix [for]="picker" ></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<mat-icon (click)="toNextWeek()">navigate_next</mat-icon>
</div>
<ul>
<li>Mon</li>
<li>Tue</li>
<li>Wed</li>
<li>Thu</li>
<li>Fri</li>
<li>Sat</li>
<li>Sun</li>
</ul>
<div>

</div>
  `,
  styles: [`
  mat-icon:hover {
    cursor: pointer;
  }
  .container{
    text-align: center;
  }
  li{
    display: inline; margin-left: 10px; padding: 20px; vertical-align: top;
  }
  `]
})

export class DatePickerComponent implements OnInit {
  
  constructor(public datepipe: DatePipe, public datePickerService: DatePickerService) { }
  newDate:Date
  date: Date;
  currentDate = {
    value : new Date()
  }
  ngOnInit(): void {
  } 

  updateDoB(dateObject){
    this.currentDate.value = dateObject.value;
    let transform = this.datepipe.transform(dateObject.value, 'yyyy-MM-dd');
     console.log(transform);
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
}