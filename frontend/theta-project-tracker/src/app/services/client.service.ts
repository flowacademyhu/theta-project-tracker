import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  fetchClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + 'client');
  }
  fetchClientByID(id: number): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + `client/${id}`);
  }
  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'client', client, { responseType: 'text' });
  }
  updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(this.apiUrl + `client/${id}`, client);
  }
  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(this.apiUrl + `client/${id}`).pipe(tap(() => this.fetchClients()));
  }
}