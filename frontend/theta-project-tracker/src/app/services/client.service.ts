import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientService {
  constructor() { }

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

  getClients(): BehaviorSubject<Client[]> {
    return this.clients$;
  }
  getClientByID(id: number):Client {
    return this.clients.find(c => c.id === id);
  }
  addClient(client: Client) {
    this.clients.push(client);
    return this.clients$.next([...this.clients]);
  }
  updateClient(id: number, client: Client) {
   const index = this.clients.findIndex(c => c.id === id);
   this.clients[index] = client;
    return this.clients$.next([...this.clients]);
  }
  deleteClient(id: number) {
    this.clients.splice(this.clients.findIndex(c => c.id === id), 1);
    return this.clients$.next([...this.clients]);
  }
}