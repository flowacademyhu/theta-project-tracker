import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { ClientService } from '../services/client.service';

@Injectable({ providedIn: 'root' })
export class ClientsResolver implements Resolve<Client[]> {

  constructor(private clientService: ClientService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Client[]> | Promise<Client[]> | Client[] {
    return this.clientService.getClients();
  }
}