import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ActionLabel } from '../models/action-label.model';
import { ActionLabelService } from '../services/action-label.service';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<ActionLabel[]> {
  constructor(private UserService: ActionLabelService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ActionLabel[]> | Promise<ActionLabel[]> | ActionLabel[] {
    const id = +route.params.id;
    return this.UserService.fetchActionLabels();
  }
}