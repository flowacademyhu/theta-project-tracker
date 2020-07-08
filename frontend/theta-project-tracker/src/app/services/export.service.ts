import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  exportReportsByProjectHours(startDate, endDate, projects) {
    console.log(projects);
    return this.http.get(this.apiUrl + 'export/project/hours', { params: {
      from: startDate,
      to: endDate,
      projects: projects
    }} );
  }

  exportReportsByProjectCost(startDate, endDate, projects): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/project/cost', { params: {
      from: startDate,
      to: endDate,
      projects: projects
    }});
  }

  exportReportsByUserHours(startDate, endDate, users): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/user/hours', { params: {
      from: startDate,
      to: endDate,
      users: users
    }});
  }

  exportReportsByUserCost(startDate, endDate, users): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/user/cost', { params: {
      from: startDate,
      to: endDate,
      users: users
    }});
  }

  exportReportsBudget(startDate, endDate, projects): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/project/budget', { params: {
      from: startDate,
      to: endDate,
      projects: projects
    }});
  }
}