import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class DatePickerService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, public datepipe: DatePipe) { }

  fetchCurrentWeek(): Observable<string> {
    return this.http.get<string>(this.apiUrl + 'timeRecord');
  }
}

//'YYYY-MM-DD'
//timeRecord?date=2020-03-25