import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})

export class ReportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  getReportsByProjectHour() {
    return this.http.get(this.apiUrl + 'report');
  }
}