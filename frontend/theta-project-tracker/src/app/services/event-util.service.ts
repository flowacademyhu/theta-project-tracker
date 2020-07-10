import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class EventUtilService {
  constructor(private http: HttpClient) { }

  getEvents(month, year): Observable<BackEndResp[]> {
    return this.http.get<BackEndResp[]>(`http://localhost:3000/calendar?year=${year}&&month=${month}`);
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



export interface BackEndResp {
  date: string;
  day?: string;
  multiplier: number;
}
