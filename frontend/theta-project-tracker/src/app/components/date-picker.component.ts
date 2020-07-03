import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DatePickerService } from '../services/date-picker.service'

@Component({
  selector: 'app-date-picker',
  template: `
  <mat-form-field appearance="fill">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" (dateChange)="updateDoB($event)">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
  `,
})
export class DatePickerComponent implements OnInit {
  
  constructor(public datepipe: DatePipe, public DatePickerService: DatePickerService) { }
  
  newDate:Date = new Date;
  date:Date = new Date;
  ngOnInit(): void {
  }
  
  updateDoB(dateObject){
    dateObject = this.datepipe.transform(this.date, 'yyyy-MM-dd');
     console.log(dateObject);
   }
   
}