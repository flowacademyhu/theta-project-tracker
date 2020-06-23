import { Injectable } from '@angular/core';
import { Milestone } from '../models/milestone.model';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {
  constructor() { };

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

  public fetchMilestones () {
    return this.milestones$
  }
  public fetchMilestone(id: number) {
    return { ...this.milestones.find(milestone => milestone.id === id) };
  }
  public addMilestone(milestone: Milestone) {
    milestone.id = this.milestones.length + 1;
    this.milestones.push(milestone);
    this.milestones$.next([...this.milestones]);
  }
  public updateMilestone(id: number, milestone: Milestone) {
    const index = this.milestones.findIndex(char => char.id === id);
    this.milestones[index] = milestone;
    this.milestones$.next([...this.milestones]);
  }
  public deleteMilestone(id: number) {
    this.milestones.splice(this.milestones.findIndex(u=> u.id === id), 1);
    return this.milestones$.next([...this.milestones]);
  } 
}