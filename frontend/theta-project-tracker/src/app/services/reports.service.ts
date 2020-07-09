import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Result {
  [projectName: string]: {
    [userName: string]: number;
    total: number;
  }
}

export enum ReportRoute {
  BY_PROJECT_HOURS = 'report/project/hours',
  BY_PROJECT_COST = 'report/project/cost',
  BY_USER_HOURS = 'report/user/hours',
  BY_USER_COST = 'report/user/cost',
  BY_BUDGET = 'report/project/budget'
}

@Injectable({providedIn: 'root'})
export class ReportsService {
  apiUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getReports(start, end, array: any[], route: ReportRoute) {
    let params: HttpParams = new HttpParams();
    params = params.append('from', start);
    params = params.append('to', end);
    if (array.length !== 0) {
      params = params.append('projects', JSON.stringify(array.map(i => i.id)));
    }

    return this.http.get(this.apiUrl + route, { params });
  }
}
