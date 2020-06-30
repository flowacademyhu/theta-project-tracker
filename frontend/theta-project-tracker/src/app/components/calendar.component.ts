import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CalendarOptions, FullCalendarModule, EventApi, DateSelectArg, EventClickArg } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from '../event-util';
import { isNumber } from 'util';
import { isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-calendar',
  template: `
  <full-calendar id="calendar" [options]="calendarOptions"></full-calendar>
  `,
  styles: [``]
})
export class CalendarComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: { left: 'today', center: 'title', right: 'prev next' }, // buttons for switching between views
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  }
  currentEvents: EventApi[] = [];
  handleDateSelect(selectInfo: DateSelectArg) {
    const title: any = prompt('Please enter the overtime value');
    const calendarApi = selectInfo.view.calendar;


    calendarApi.unselect();
    if (!isNaN(title) && !isEmpty()) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    } else {
      title.confirm('Wrong value');
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the overtime? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
