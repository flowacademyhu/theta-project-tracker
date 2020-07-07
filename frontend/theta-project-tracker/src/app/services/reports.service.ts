import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface Result {
  [projectName: string]: {
    [userName: string]: number;
    total: number;
  }
}

@Injectable({providedIn: 'root'})
export class ReportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  getReportsByProjectHours(startDate, endDate) {
    return this.http.get(this.apiUrl + 'report/project/hours',{ params: {
      from: startDate,
      to: endDate
    }} );
  }

  getReportsByProjectCost(startDate, endDate): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/project/cost',{ params: {
      from: startDate,
      to: endDate
    }} );
  }

  getReportsByUserHours(startDate, endDate): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/user/hours',{ params: {
      from: startDate,
      to: endDate
    }} );
  }

  getReportsByUserCost(startDate, endDate): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/user/cost',{ params: {
      from: startDate,
      to: endDate
    }} );
  }

  getReportsBudget(startDate, endDate): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'report/project/budget',{ params: {
      from: startDate,
      to: endDate
    }} );
  }
}