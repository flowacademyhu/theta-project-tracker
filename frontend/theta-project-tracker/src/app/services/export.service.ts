import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  exportReportsByProjectHours() {
    return this.http.get(this.apiUrl + 'export/project/hours', {responseType: 'blob'}).subscribe(file => {
      this.downLoadFile(file, "application/ms-excel")
    });
  }

  exportReportsByProjectCost() {
    return this.http.get(this.apiUrl + 'export/project/cost', {responseType: 'blob'}).subscribe(file => {
      this.downLoadFile(file, "application/ms-excel")
    });
  }

  exportReportsByUserHours() {
    return this.http.get(this.apiUrl + 'export/user/hours', {responseType: 'blob'}).subscribe(file => {
      this.downLoadFile(file, "application/ms-excel")
    });
  }

  exportReportsByUserCost() {
    return this.http.get(this.apiUrl + 'export/user/cost', {responseType: 'blob'}).subscribe(file => {
      this.downLoadFile(file, "application/ms-excel")
    });
  }

  exportReportsBudget() {
    return this.http.get(this.apiUrl + 'export/project/budget', {responseType: 'blob'}).subscribe(file => {
      this.downLoadFile(file, "application/ms-excel")
    });
  }


  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
  }
}