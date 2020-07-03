import { EventUtilService } from './../services/event-util.service';
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
  FullCalendarComponent,
  CalendarDataManager,
  DayCellContentArg
 } from '@fullcalendar/angular';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { title, exit } from 'process';
import { isNull } from 'util';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';



@Component({
  selector: 'app-calendar',
  template: `
  <full-calendar id="calendar" [options]="calendarOptions"></full-calendar>
  `,
  styles: [``]
})
export class CalendarComponent implements OnInit{


  constructor(
    private eventUtilService: EventUtilService,
    ) {}
;


  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  monthIterator = 7;
  yearIterator = 2020;
  public currentEvents: EventInput[];

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
  defaultAllDay: true,
  firstDay: 1,

  };

  getMethod() {
    this.eventUtilService.getEvents(this.yearIterator, this.monthIterator).pipe(map(data => {
      const array: EventInput[] = [];
      for ( const i of data) {
        let day: EventInput;
        day = {
          title: i.multiplier.toString(),
          date: i.date
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
      this.getMethod();
  }

  handleDateSelect(selectInfo: DayCellContentArg) {
    const title: any = prompt('Please enter the overtime value');
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo, 'KUTYA', title);
    const calendarData = {
      multiplier: parseInt(title),
      date: selectInfo.startStr
    };
    if (!isNaN(title)) {
      this.eventUtilService.createEvent(calendarData).subscribe( event => {
        this.calendarOptions.events = event;
        this.calendarOptions.events.editable = true;
        this.getMethod();
      });
      calendarApi.addEvent(calendarData);
    }
    else {
      alert('Wrong value');
    }
    return calendarData;
  }

  handleEventClick(clickInfo: EventClickArg) {
    console.log(clickInfo.event);
    const calendarData = {
      multiplier: parseInt(title),
      date: clickInfo.event.startStr,
    };
    console.log(calendarData + 'CICAAAA')
    if (confirm(`Are you sure you want to delete the overtime? '${clickInfo.event.title}'`)) {
      this.eventUtilService.deleteEvent(calendarData).subscribe( data => {
        this.getMethod();
        clickInfo.event.remove();
      });
    }
    console.log(calendarData + 'MACSKAAAAAA');
  }
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}

