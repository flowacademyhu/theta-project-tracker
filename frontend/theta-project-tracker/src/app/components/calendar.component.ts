import { CalendarModalComponent } from './../modals/calendar-dialog-modal.component';
import { EventUtilService } from './../services/event-util.service';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { map, isEmpty } from 'rxjs/operators';

import {
  FullCalendarModule,
  EventApi,
  DateSelectArg,
  EventClickArg,
  CalendarApi,
  EventAddArg,
  DateInput,
  getEventClassNames,
  EventInput,
  Calendar,
  CalendarOptions,
  FullCalendarComponent,
  CalendarDataManager,
  DayCellContentArg,
  startOfDay
} from '@fullcalendar/angular';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { title, exit } from 'process';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { Observable, empty, Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { isEmptyExpression } from '@angular/compiler';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TitleCasePipe } from '@angular/common';
import { calendarFormat, months, RFC_2822 } from 'moment';
import { DateClickArg } from '@fullcalendar/interaction';



@Component({
  selector: 'app-calendar',
  template: `
  <full-calendar #calendar class="calendar" [options]="calendarOptions"></full-calendar>

  `,
  styles: [`
  .calendar {
  width: 75%;
  margin: 2em auto;
}
  `]
})
export class CalendarComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private eventUtilService: EventUtilService, private dialog: MatDialog) { }
  validatorTitle = new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,}$/)]);
  @ViewChild('calendar') public fullCalendar: FullCalendarComponent;
  public calendarApi;
  public date;
  public month;
  public year;
  public day;

  currentEvents: EventInput[];
  subscriptions$: Subscription[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: { left: 'today', center: 'title', right: 'prev,next' },
    aspectRatio: 2.5,
    customButtons: {
      prev: {
        click: () => {
          this.goPrev();
        },
      },
      next: {
        click: () => {
        this.goNext();
      }
    }
  },
    eventColor:  'rgba(34, 34, 34, 0.9)',
    weekends: true,
    selectable: false,
    eventClick: this.handleEventClick.bind(this),
    defaultAllDay: true,
    firstDay: 1,
  };


  goPrev() {
    this.calendarApi.prev();
    const date = this.calendarApi.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    console.log(this.year, this.month, 'PREV');
    this.getMethod(this.month, this.year );
  }

  goNext() {
    this.calendarApi.next(); // call a method on the Calendar object
    const date = this.calendarApi.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
    console.log(this.year, this.month, 'NEXT');
    this.getMethod( this.month, this.year );
  }

  getMethod(month, year) {
    this.eventUtilService.getEvents(month, year).pipe(map(data => {
      const array: EventInput[] = [];
      for (const i of data) {
        let day: EventInput;
        day = {
          title: i.multiplier.toString(),
          date: i.date
        }
        array.push(day);
      }
      return array;
    }))
    .subscribe(event => {
      this.currentEvents = event;
      this.calendarOptions.events = event;
      });
    }

    ngOnInit(): void{
  }



  ngOnDestroy(): void {
    this.subscriptions$.forEach(unsub => { unsub.unsubscribe(); }, );
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.fullCalendar.getApi();
    this.date = this.calendarApi.getDate();
    this.day = this.date.getDay();
    this.month = this.date.getMonth() + 1;
    this.year = this.date.getFullYear();
    this.getMethod(this.month, this.year);
  }

  handleEventClick(clickInfo: EventClickArg) {
    const calendarApi = clickInfo.view.calendar;
    const dialogRef = this.dialog.open(CalendarModalComponent, {
    });
    const calendarData = {
      multiplier: parseInt(clickInfo.event.title, 2),
      date: clickInfo.event.startStr,
    };
    dialogRef.afterClosed().subscribe(res => {
      if (res === false) {
        const overT = dialogRef.componentInstance.hour.get('overTime').value;
        calendarData.multiplier = overT;
        this.eventUtilService.createEvent(calendarData).subscribe(event => {
            this.getMethod(this.month, this.year);
        });
    } else if (res) {
      this.eventUtilService.deleteEvent(calendarData).subscribe(data => {
        clickInfo.event.remove();
        this.getMethod(this.month, this.year);
      });
    }
  });
}
}
