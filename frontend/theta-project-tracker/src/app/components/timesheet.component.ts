import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timesheet',
  template: `
  <app-record-one-week></app-record-one-week>
  `,
  styles: [''],
})
export class TimesheetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
