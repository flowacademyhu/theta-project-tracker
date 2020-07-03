import { OvertimeMultiplier } from './../../../../../backend/src/app/models/overtimeMultiplier';
import { EventInput, EventApi, EventInteractionState } from '@fullcalendar/angular';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class EventUtilService {
  constructor(private http: HttpClient) { }

  getEvents(yearIterator, monthIterator): Observable<BackEndResp[]> {
    return this.http.get<BackEndResp[]>(`http://localhost:3000/calendar?year=${yearIterator}&&month=${monthIterator}`);
  }
  createEvent(calendarData: BackEndResp) {
    console.log(calendarData);
    return this.http.put(`http://localhost:3000/overtimeMultiplier`, calendarData);
}
  deleteEvent(calendarData: BackEndResp) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: calendarData
    };
    return this.http.delete('http://localhost:3000/overtimeMultiplier', options);
    }
  }



const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
export interface BackEndResp {
  date: string;
  day?: string;
  multiplier: number;
}
