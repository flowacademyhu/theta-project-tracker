import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ExportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  exportReportsByProjectHours(startDate, endDate, projects) {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get(this.apiUrl + 'export/project/hours', { params: {
      from: startDate,
      to: endDate,
      projects: arrayString
    }} ).subscribe();
  }

  exportReportsByProjectCost(startDate, endDate, projects) {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get<File>(this.apiUrl + 'export/project/cost', { params: {
      from: startDate,
      to: endDate,
      projects: arrayString
    }} ).subscribe();
  }

  exportReportsByUserHours(startDate, endDate, users) {
    const arrayString = JSON.stringify(this.createArray(users));
    return this.http.get<File>(this.apiUrl + 'export/user/hours', { params: {
      from: startDate,
      to: endDate,
      users: arrayString
    }}).subscribe();
  }

  exportReportsByUserCost(startDate, endDate, users) {
    const arrayString = JSON.stringify(this.createArray(users));
    return this.http.get<File>(this.apiUrl + 'export/user/cost', { params: {
      from: startDate,
      to: endDate,
      users: arrayString
    }}).subscribe();
  }

  exportReportsBudget(startDate, endDate, projects) {
    const arrayString = JSON.stringify(this.createArray(projects));
    return this.http.get<File>(this.apiUrl + 'export/project/budget', { params: {
      from: startDate,
      to: endDate,
      projects: arrayString
    }}).subscribe();
  }

  createArray(original) {
    const result = [];
    original.forEach(value => {
      result.push(value.id);
    })
    return result;
  }
}
