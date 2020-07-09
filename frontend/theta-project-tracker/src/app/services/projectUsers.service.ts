import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProjectAssigned, UserProjectsUpdate } from '../models/user.model';


@Injectable({providedIn: 'root'})
export class ProjectUsersService {
  constructor(private http: HttpClient) { }
  apiUrl: string = environment.baseUrl;

  getUsersProjects(id: number) {
    return this.http.get<ProjectAssigned[]>(this.apiUrl + `user/${id}/project`)
  }
  updateUsersProjects(projects: UserProjectsUpdate) {
    const httpOptions: object = {responseType: 'text'};
    return this.http.post(this.apiUrl + 'project/user', projects, httpOptions);
  }
}