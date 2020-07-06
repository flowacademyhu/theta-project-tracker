import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectAssigned } from '../models/user.model';


@Injectable({providedIn: 'root'})
export class ProjectUsersService {
  constructor(private http: HttpClient) { }
  apiUrl: string = environment.baseUrl;

  getUsersProjects(id: number) {
    return this.http.get<ProjectAssigned[]>(this.apiUrl + `user/${id}/project`)
  }
  assignProjectToUser(userId: number, projects: ProjectAssigned[]) {
    return this.http.post(this.apiUrl + `project/user/${userId}`, projects)
  }
  unAssignProject(userId: number, projects: ProjectAssigned[]) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: projects
    }
    return this.http.delete(this.apiUrl + `project/user/${userId}`, options)
  }
}