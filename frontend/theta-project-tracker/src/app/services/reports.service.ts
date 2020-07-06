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
    return this.http.get(this.apiUrl + `report/project/hours?to=${startDate}&from=${endDate}`);
  }

  getReportsByProjectCost(): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/project/cost');
  }

  getReportsByUserHours(): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/user/hours');
  }

  getReportsByUserCost(): Observable<Result> {
    return this.http.get<Result>(this.apiUrl + 'report/user/cost');
  }

  getReportsBudget(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'report/project/budget');
  }
}