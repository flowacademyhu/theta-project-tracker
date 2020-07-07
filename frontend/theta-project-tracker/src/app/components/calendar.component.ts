import { CalendarModalComponent } from './../modals/calendar-dialog-modal.component';
import { EventUtilService } from './../services/event-util.service';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, ViewChild } from '@angular/core';
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



@Component({
  selector: 'app-calendar',
  template: `
  <full-calendar id="calendar" [options]="calendarOptions"></full-calendar>

  `,
  styles: [``]
})
export class CalendarComponent implements OnInit {

  constructor(private eventUtilService: EventUtilService,  private dialog: MatDialog) { }

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  monthIterator = 7;
  yearIterator = 2020;
  public currentEvents: EventInput[];
  subscriptions$: Subscription[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: { left: 'today', center: 'title', right: 'prev next' },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventChange: this.handleEvents.bind(this),
    defaultAllDay: true,
    firstDay: 1,
  };

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  getMethod() {
    this.eventUtilService.getEvents(this.yearIterator, this.monthIterator).pipe(map(data => {
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
        console.log(event);
        this.calendarOptions.events = event;
      });
  }

  ngOnInit(): void {
    this.getMethod();
  }


  handleDateSelect(selectInfo: DayCellContentArg) {
    const validatorTitle = new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{0,}$/ )]);
    const calendarApi = selectInfo.view.calendar;
    const calendarData = {
      multiplier: parseInt(title),
      date: selectInfo.startStr
    };

    if (!isNaN(title) && !isNull(title)) {
      this.eventUtilService.createEvent(calendarData).subscribe(event => {
        this.calendarOptions.events = event;
        this.getMethod();
      });
      calendarApi.addEvent(calendarData);
    }
    else {
      alert('Please add a valid overtime value!');
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    const calendarData = {
      multiplier: parseInt(title),
      date: clickInfo.event.startStr,
    };
    const dialogRef = this.dialog.open(CalendarModalComponent, {
      width: '25%',
      height: '15%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eventUtilService.deleteEvent(calendarData).subscribe(data => {
          this.getMethod();
          clickInfo.event.remove();
        });
      }
    }));
  }

  handleEvents(events: EventInput[]) {
  }
}

