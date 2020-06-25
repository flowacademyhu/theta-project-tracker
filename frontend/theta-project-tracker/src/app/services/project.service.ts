import { Injectable } from '@angular/core';
import { Project } from '../models/project.model'
import { BehaviorSubject, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

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
  }];
  projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>(this.projects)

  public fetchProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(environment.baseUrl + 'project');
  }
  public fetchProject(id: number) {
    return this.http.get<Project>(environment.baseUrl + `project/${id}`);
  }
  public addProject( project: Project) {
    return this.http.post<Project>(environment.baseUrl + 'project', project);
  }
  public updateProject(id: number, project: Project) {
    return this.http.put<Project>(environment.baseUrl + `project/${id}`, project);
  }
  public deleteProject(id: number) {
    return this.http.delete<Project>(environment.baseUrl + `project/${id}`);
  }
}