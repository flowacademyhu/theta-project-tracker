import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RecordCreate } from '../models/record-create.model';

@Injectable({ providedIn: 'root' })
export class TimesheetService {
    apiUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getTimeRecords(date?: string): Observable<TimeRecordResponse> {
        console.log('service', date)
        return this.http.get<TimeRecordResponse>(this.apiUrl + `timeRecord?date=${date}`);
    }
    createTimeRecords(record: RecordCreate, date?: string) {
        console.log('service', date)
        const httpOptions: object = {responseType: 'text'};
        return this.http.post<RecordCreate>(this.apiUrl + `timeRecord?date=${date}`, record, httpOptions);
    }
    updateTimeRecords(records: ResponseItem[], date?: string): Observable<string> {
        console.log('service', date)
        const httpOptions: object = {responseType: 'text'};
        return this.http.put<string>(this.apiUrl + `timeRecord?date=${date}`, records, httpOptions)
    }
    deleteTimeRecords(ids, date?: string):Observable<string> {
        console.log('service', date)
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: ids
          }
        return this.http.delete<string>(this.apiUrl + `timeRecord?date=${date}`, options)
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
/* resp:
{
    "modified":
    [
        { id: 2, normalHours: 4, overTime: 2 },
        { id: 5, normalHours: 4, overTime: 2 }
    ]
    localhost:3000/timeRecord?date=2020-07-13
} */
