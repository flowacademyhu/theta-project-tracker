import { EventUtilService, createEventId } from './../services/event-util.service';
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';

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
  FullCalendarComponent
 } from '@fullcalendar/angular';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { title, exit } from 'process';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-calendar',
  template: `
  <full-calendar id="calendar" [options]="calendarOptions"></full-calendar>
  `,
  styles: [``]
})
export class CalendarComponent implements OnInit, AfterContentChecked{


  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  monthIterator = 7;
  yearIterator = 2020;


  constructor(
    private eventUtilService: EventUtilService,
    private http: HttpClient
    ) {}

  public currentEvents: EventInput[];
  calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  headerToolbar: { left: 'today', center: 'title', right: 'prev next' },
  customButtons: {
    prev: {
      text: 'Previous',
      click() {
      this.monthIterator -= 1;
      }
    }
  },
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  select: this.handleDateSelect.bind(this),
  eventClick: this.handleEventClick.bind(this),
  defaultAllDay: true,
  firstDay: 1,
  };

  getMethod() {
    this.eventUtilService.getEvents(this.yearIterator, this.monthIterator).pipe(map(data => {
      const array: EventInput[] = [];
      for ( let i = 0; i < data.length; i++) {
        let day: EventInput;
        day = {
          title: data[i].multiplier.toString(),
          date: data[i].date
        }
        array.push(day);
      }
      return array;
    }))
    .subscribe( event => {
      this.currentEvents = event;
      console.log(event);
      this.calendarOptions.events = event;
    });
  }

  ngOnInit(): void {
      this.getMethod()
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title: any = prompt('Please enter the overtime value');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    console.log(selectInfo);
    if (!isNaN(title)) {
      const calendarData = {
        multiplier: parseInt(title),
        date: selectInfo.startStr,
      }
      this.eventUtilService.createEvent(calendarData).subscribe( event => {
        this.calendarOptions.events = event;
        this.getMethod();
      });
    calendarApi.addEvent({});
    }
    else {
      alert('Wrong value');
    }
  };
  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the overtime? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }
  handleEvents(events: EventApi[]) {

  }

}


