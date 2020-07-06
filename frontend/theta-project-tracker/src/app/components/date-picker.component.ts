import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatePickerService } from '../services/date-picker.service';
import { MatDatepickerInput } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  template: `
  <div class="container">
  <mat-icon (click)="toPreviousWeek()">navigate_before</mat-icon>
  <mat-form-field appearance="fill">
  <mat-label>Choose a date</mat-label>
  <input   matInput [matDatepicker]="picker" (dateChange)="updateDoB($event)">
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
  ngOnInit(): void {
    this.newDate = new Date;
  } 

  updateDoB(dateObject){
    console.log(dateObject)
    dateObject = this.datepipe.transform(dateObject.value, 'yyyy-MM-dd');
     console.log(dateObject);
   /*   this.datePickerService.fetchCurrentWeek(); */
   }
   toPreviousWeek() {
     let previousWeek = new Date(this.newDate);
     previousWeek.setDate(previousWeek.getDate() - 7);
     this.newDate = previousWeek;
      /* this.newDate = this.datepipe.transform(this.newDate.valueOf(), 'yyyy-MM-dd') */
     this.updateDoB(previousWeek);
     /* date = this.datepipe.transform(date.value, 'yyyy-MM-dd'); */
   }
  toNextWeek() { 
    let nextWeek = new Date(this.newDate.valueOf());
    nextWeek.setDate(nextWeek.getDate() + 7); 
    this.newDate = nextWeek;
    console.log(this.newDate);
  }
}