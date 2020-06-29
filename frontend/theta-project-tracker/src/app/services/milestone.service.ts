import { Injectable } from '@angular/core';
import { Milestone } from '../models/milestone.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public fetchMilestones(): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.apiUrl + 'milestone');
  }
  public fetchMilestone(id: number): Observable<Milestone> {
    return this.http.get<Milestone>(this.apiUrl + +`milestone/${id}`);
  }
  public addMilestone(milestone: Milestone): Observable<Milestone> {
    return this.http.post<Milestone>(this.apiUrl + 'milestone', milestone);
  }
  public updateMilestone(id: number, milestone: Milestone) {
    return this.http.put(this.apiUrl + `milestone/${id}`, milestone);
  }
  public deleteMilestone(id: number): Observable<Milestone> {
    return this.http.delete<Milestone>(this.apiUrl + `milestone/${id}`).pipe(tap(() => this.fetchMilestones()));
  }
}