import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <md-content ng-controller="AppCtrl as ctrl" layout="column" layout-gt-sm="row" layout-padding ng-cloak>
      <div layout="column" flex-order="1" flex-order-gt-sm="0">
        <md-subheader>Start Date</md-subheader>
        <md-calendar ng-model="ctrl.startDate"></md-calendar>
      </div>
      <div layout="column" flex-order="1" flex-order-gt-sm="1">
        <md-subheader>End Date</md-subheader>
        <md-calendar ng-model="ctrl.endDate"></md-calendar>
      </div>
      <div layout="column" flex-order="0" flex-order-gt-sm="2">
        <md-subheader>Dates</md-subheader>
        <div>
          <label>Start</label>
          <div>{{ctrl.startDate | date:shortDate}}</div>
        </div>
        <div><label>End</label>
          <div>{{ctrl.endDate | date:shortDate}}</div>
        </div>
      </div>
  </md-content>
  `,
  styles: [`
  .datepickerdemoCalendar {
  /** Demo styles for mdCalendar. */ }
  .datepickerdemoCalendar label {
    font-size: x-small; }`],
})
export class CalendarComponent implements OnInit {

  angular.module('calendarDemo', ['ngMaterial']).controller('AppCtrl', function() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate() + 5);
  });

  constructor() { }

  ngOnInit(): void {
  }

}
