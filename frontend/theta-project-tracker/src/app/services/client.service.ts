import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor(private http: HttpClient) { }

  clients: Client[] = [
    {
      id: 1,
      name: 'CicaClient',
      description: 'egy cica, aki egy client'
    },
    {
      id: 2,
      name: 'VoodooPark',
      description: 'lorem ipsum dolor'
    },
    {
      id: 3,
      name: 'South Park',
      description: 'lorem ipsum calor'
    },
    {
      id: 4,
      name: 'BalázsClient',
      description: 'lorem ipsum tumor'
    },
    {
      id: 5,
      name: 'Jázon Client',
      description: 'lorem ipsum rubor'
    }
  ];
  clients$: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([...this.clients]);

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(environment.baseUrl + 'client');
  }
  getClientByID(id: number){
    return this.http.get<Client>(environment.baseUrl + `client/${id}`);
  }
  addClient(client: Client) {
    console.log(client);
    return this.http.post<Client>(environment.baseUrl + 'client', client);
  }
  updateClient(id: number, client: Client) {
    return this.http.put<Client>(environment.baseUrl + `client/${id}`, client);
  }
  deleteClient(id: number) {
    return this.http.delete<Client>(environment.baseUrl + `client/${id}`);
  }
}