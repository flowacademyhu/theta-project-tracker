import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { TimesheetService, TimeRecordResponse } from '../services/timsheet.service';

@Injectable({ providedIn: 'root' })
export class TimeRecordsResolver implements Resolve<TimeRecordResponse> {
  constructor(private timesheetService: TimesheetService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<TimeRecordResponse> | Promise<TimeRecordResponse> | TimeRecordResponse {
    return this.timesheetService.getTimeRecords();
  }
}