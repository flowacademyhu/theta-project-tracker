import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { weekdays } from 'moment';
import { RecordCreate } from '../models/record-create.model';

@Injectable({ providedIn: 'root' })
export class TimesheetService {

    resp = {
        "weekDays": [
            "2020-06-29",
            "2020-06-30",
            "2020-07-01",
            "2020-07-02",
            "2020-07-03",
            "2020-07-04",
            "2020-07-05"
        ],
        "projects": [

            {
                "projectId": 3,
                "milestoneId": 1,
                "actionLabelId": 1
            },
            {
                "projectId": 3,
                "milestoneId": 2,
                "actionLabelId": 5
            },
            {
                "projectId": 3,
                "milestoneId": 2,
                "actionLabelId": 5
            },


        ],
        "data": [

            {
                "id": 2,
                "date": "2020-06-29",
                "normalHours": 3,
                "overTime": 0
            }
            ,

            {
                "id": 3,
                "date": "2020-06-30",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 4,
                "date": "2020-07-01",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 5,
                "date": "2020-07-02",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 6,
                "date": "2020-07-03",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 7,
                "date": "2020-07-04",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 8,
                "date": "2020-07-05",
                "normalHours": 2,
                "overTime": 1
            }
            ,

            {
                "id": 16,
                "date": "2020-06-29",
                "normalHours": 2,
                "overTime": 3
            }
            ,

            {
                "id": 17,
                "date": "2020-06-30",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 18,
                "date": "2020-07-01",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 19,
                "date": "2020-07-02",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 20,
                "date": "2020-07-03",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 21,
                "date": "2020-07-04",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 22,
                "date": "2020-07-05",
                "normalHours": 4,
                "overTime": 4
            },
            {
                "id": 16,
                "date": "2020-06-29",
                "normalHours": 2,
                "overTime": 3
            }
            ,

            {
                "id": 17,
                "date": "2020-06-30",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 18,
                "date": "2020-07-01",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 19,
                "date": "2020-07-02",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 20,
                "date": "2020-07-03",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 21,
                "date": "2020-07-04",
                "normalHours": 0,
                "overTime": 0
            }
            ,

            {
                "id": 22,
                "date": "2020-07-05",
                "normalHours": 4,
                "overTime": 4
            },


        ]
    }
    apiUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getTimeRecords(): Observable<TimeRecordResponse> {
        return this.http.get<TimeRecordResponse>(this.apiUrl + 'timeRecord?date=2020-07-04');
    }
    createTimeRecords(record: RecordCreate) {
        console.log('POST', record)
        const httpOptions: object = {responseType: 'text'};
        return this.http.post<RecordCreate>(this.apiUrl + 'timeRecord?date=2020-07-04', record, httpOptions);
    }
    updateTimeRecords(records: ResponseItem[]): Observable<string> {
        const httpOptions: object = {responseType: 'text'};
        return this.http.put<string>(this.apiUrl + 'timeRecord?date=2020-06-29', records, httpOptions)
    }
    deleteTimeRecords(ids):Observable<string> {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: ids
          }
        return this.http.delete<string>(this.apiUrl + 'timeRecord?date=2020-06-29', options)
    }

}
export interface TimeRecordResponse {
    weekDays: [];
    projects: [];
    data: []
}

export interface DailyRecord {
    weekday?: string;
    date: string;
    id: number;
    normalHours: number;
    overTime: number;
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
