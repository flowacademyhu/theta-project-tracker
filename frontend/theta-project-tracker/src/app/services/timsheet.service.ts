import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RecordCreate } from '../models/record-create.model';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    apiUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getTimeRecords(date?: string): Observable<TimeRecordResponse> {
        let params = new HttpParams();
        if (date) {
            params = params.append('date', date)
        }
        return this.http.get<TimeRecordResponse>(this.apiUrl + 'timeRecord', { params: params });
    }
    createTimeRecords(record: RecordCreate, date?: string) {
        let params = new HttpParams();
        if (date) {
            params = params.append('date', date)
        }
        return this.http.post(this.apiUrl + 'timeRecord', record, { params: params, responseType: 'text' });
    }
    updateTimeRecords(records: UpdateRecords, date?: string) {
        let params = new HttpParams();
        if (date) {
            params = params.append('date', date)
        }
        return this.http.put(this.apiUrl + 'timeRecord', records, { params: params, responseType: "text" });
    }

    deleteTimeRecords(ids, date?: string): Observable<string> {
        let params = new HttpParams();
        if (date) {
            params = params.append('date', date)
        }
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: ids,
            params: params
        }
        return this.http.delete<string>(this.apiUrl + 'timeRecord', options)
    }

    copyLastWeek(date?: CopyLastWeek): Observable<string> {
        if (date) {
            return this.http.post(this.apiUrl + 'timeRecord/copy', date, { responseType: 'text' });
        } else {
            let currentDate = new Date().toISOString().split('T')[0];
            return this.http.post(this.apiUrl + 'timeRecord/copy', currentDate, { responseType: 'text' });
        }
    }
}

export interface TimeRecordResponse {
    weekDays: string[];
    projects: RecordCreate[];
    data: ResponseItem[]
}

export interface UpdateRecords {
    modified: ResponseItem[];
}
export interface ResponseItem {
    id: number;
    normalHours: number;
    overTime: number;
}
export interface CopyLastWeek {
    date: string
}
/* resp:
{
    "modified":
    [
        { id: 2, normalHours: 4, overTime: 2 },
        { id: 5, normalHours: 4, overTime: 2 }
    ]
    localhost:3000/timeRecord?date=2020-07-13
} */
