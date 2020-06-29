import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


declare var $: any;
@Component({
  selector: 'app-calendar',
  template: `<div class='app-calendar'>
  <full-calendar
    #calendar
    defaultView="dayGridMonth"
    (dateClick)="handleDateClick($event)"
    (eventClick)="eventClicked($event)"
  ></full-calendar>
</div>
`,
  styles: [``]
})
export class CalendarComponent {

  constructor() { }
  calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];

  handleDateClick(calDate) {
    // console.log(calDate);
  }

  eventClicked(calDate) {
    // console.log(calDate);
  }
}
