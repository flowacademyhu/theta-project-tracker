import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model'
import { ProjectService } from '../services/project.service';

@Injectable({ providedIn: 'root' })
export class ProjectResolver implements Resolve<Project[]> {
  constructor(private projectService: ProjectService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Project[]> | Promise<Project[]> | Project[] {
    const id = +route.params.id;
    return this.projectService.fetchProjects();
  }
}