import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: getEvents(),
    start: TODAY_STR,
  },
  // {
  //   id: createEventId(),
  //   title: 'Timed event',
  //   start: TODAY_STR + 'T00:00:00'
  // }
];

export function createEventId() {
  return String(eventGuid++);
}

export function getEvents() {
  return this.request('GET', `${}/event`);
}
export function createEvent(event) {
  return this.request('POST', `${environment.serverUrl}/event`, event);
}
export function updateEvent(event) {
  return this.request('PUT', `${environment.serverUrl}/event/${event.id}`, event);
}
export function deleteEvent(event) {
  return this.request('DELETE', `${environment.serverUrl}/event/${event.id}`);
}


