import { Injectable } from '@angular/core';
import { Project } from '../models/project.model'
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor() { }

  public projects: Project[] = [{
    id: 1,
    name: 'x',
    client: 'asd',
    description: 'project description',
    budget: 1000
  },
  {
    id: 2,
    name: 'y',
    client: 'asdasd',
    description: 'project description',
    budget: 800
  }]
  projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projects)

  public fetchProjects(): Project[] {
    return this.projects
  }
  public fetchProject(id: number) {
    return {...this.projects.find(project => project.id === id)}
  }
  public addProject( project: Project) {
    project.id = this.projects.length + 1;
    this.projects.push(project);
  }
  public updateProject(id: number, project: Project) {
    const index = this.projects.findIndex(char => char.id === id);
    this.projects[index] = project;
  }
  public deleteProject(id: number) {
    this.projects.splice(this.projects.findIndex(u=> u.id === id), 1);
    return this.projects$.next([...this.projects]);
  }

}
