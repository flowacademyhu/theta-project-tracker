import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ExportsService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.baseUrl;
  exportReportsByProjectHours() {
    return this.http.get(this.apiUrl + 'export/project/hours', {
    });
  }

  exportReportsByProjectCost(): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/project/cost', {
    });
  }

  exportReportsByUserHours(): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/user/hours', {
    });
  }

  exportReportsByUserCost(): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/user/cost', {
    });
  }

  exportReportsBudget(): Observable<File> {
    return this.http.get<File>(this.apiUrl + 'export/project/budget', {
    });
  }
}