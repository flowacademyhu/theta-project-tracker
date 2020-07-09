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
  getReportsByProjectHours(startDate, endDate, projects) {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get(this.apiUrl + 'report/project/hours',{ params: {
      from: startDate,
      to: endDate,
      projects: arrayString
    }} );
  }

  getReportsByProjectCost(startDate, endDate, projects): Observable<Result> {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get<Result>(this.apiUrl + 'report/project/cost',{ params: {
      from: startDate,
      to: endDate,
      projects: arrayString
    }} );
  }

  getReportsByUserHours(startDate, endDate, users): Observable<Result> {
    const arrayString = JSON.stringify(this.createArray(users));
    return this.http.get<Result>(this.apiUrl + 'report/user/hours',{ params: {
      from: startDate,
      to: endDate,
      users: arrayString
    }} );
  }

  getReportsByUserCost(startDate, endDate, users): Observable<Result> {
    const arrayString = JSON.stringify(this.createArray(users));
    return this.http.get<Result>(this.apiUrl + 'report/user/cost',{ params: {
      from: startDate,
      to: endDate,
      users: arrayString
    }} );
  }

  getReportsBudget(startDate, endDate, projects): Observable<any> {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get<any>(this.apiUrl + 'report/project/budget',{ params: {
      from: startDate,
      to: endDate
    }} );
  }
  createArray(original) {
    const result = [];
    original.forEach(value => {
      result.push(value.id);
    })
    return result;
  }
}
