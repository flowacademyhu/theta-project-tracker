import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';
import { TimeRecordResponse } from './timsheet.service';

@Injectable({ providedIn: 'root' })
export class DatePickerService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  fetchCurrentWeek(currentDate?: string): Observable<TimeRecordResponse> {
    let params = new HttpParams();
    if (currentDate) {
        params = params.append('date', currentDate);
        return this.http.get<TimeRecordResponse>(this.apiUrl + 'timeRecord', { params: params });
    } else {
      currentDate = new Date().toISOString().split('T')[0];
      params = params.append('date', currentDate);
      return this.http.get<TimeRecordResponse>(this.apiUrl + 'timeRecord', { params: params });
    }
  }
}

//'YYYY-MM-DD'
//timeRecord?date=2020-03-25