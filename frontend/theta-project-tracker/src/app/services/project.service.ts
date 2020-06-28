import { Injectable } from '@angular/core';
import { Project } from '../models/project.model'
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public fetchProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl + 'project');
  }
  public fetchProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.apiUrl + `project/${id}`);
  }
  public addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.apiUrl + 'project', project, { responseType: 'text'});
  }
  public updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(this.apiUrl + `project/${id}`, project, { responseType: 'text'});
  }
  public deleteProject(id: number): Observable<Project> {
    return this.http.delete<Project>(this.apiUrl + `project/${id}`).pipe(tap(() => this.fetchProjects()));
  }
}