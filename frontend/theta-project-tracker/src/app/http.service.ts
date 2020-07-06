import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getReport() {
    return this.http.get('http://localhost:3000/report/user/hours');
  }
  constructor(private http: HttpClient) { }
}
