import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Milestone } from '../models/milestone.model'
import { MilestoneService } from '../services/milestone.service';

@Injectable({ providedIn: 'root' })
export class MilestoneResolver implements Resolve<Milestone[]> {
  constructor(private MilestoneService: MilestoneService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Milestone[]> | Promise<Milestone[]> | Milestone[] {
    const id = +route.params.id;
    return this.MilestoneService.fetchMilestones();
  }
}