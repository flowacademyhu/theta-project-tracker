import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
import { TimeRecordResponse } from './timsheet.service';

@Injectable({ providedIn: 'root' })
export class DatePickerService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  fetchCurrentWeek(currentDate?: string): Observable<TimeRecordResponse> {
    if (!currentDate) {
      currentDate = new Date().toISOString().split('T')[0]
      return this.http.get<TimeRecordResponse>(this.apiUrl + `timeRecord?date=${currentDate}`);
    } else {
      return this.http.get<TimeRecordResponse>(this.apiUrl + `timeRecord?date=${currentDate}`);
    }
   
  }
}

//'YYYY-MM-DD'
//timeRecord?date=2020-03-25