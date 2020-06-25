import { Injectable } from '@angular/core';
import { Milestone } from '../models/milestone.model';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  constructor(private http: HttpClient) { };

  public milestones: Milestone[] = [{
    id: 1,
    name: 'asd',
    project: 'x',
    description: 'Milestone Description'
  },
  {
    id: 2,
    name: 'dsa',
    project: 'y',
    description: 'Milestone Description'
  }]
  milestones$: BehaviorSubject<Milestone[]> = new BehaviorSubject<Milestone[]>(this.milestones)

  public fetchMilestones (): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(environment.baseUrl + 'milestone') };

  public fetchMilestone(id: number) {
    return this.http.get<Milestone>(environment.baseUrl + +`milestone/${id}`) };

  public addMilestone(milestone: Milestone) {
    this.http.post<Milestone>(environment.baseUrl + 'milestone', milestone) };

  public updateMilestone(id: number, milestone: Milestone) {
    this.http.put<Milestone>(environment.baseUrl + `milestone/${id}`, milestone) };

  public deleteMilestone(id: number) {
    this.http.delete<Milestone>(environment.baseUrl + `user/${id}`) }; 
}