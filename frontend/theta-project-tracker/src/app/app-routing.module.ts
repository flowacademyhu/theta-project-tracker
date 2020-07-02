import { ReportsComponent } from './components/reports.component';
import { UsersComponent } from './components/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { TimesheetComponent } from './components/timesheet.component';
import { CalendarComponent } from './components/calendar.component';
import { ProfileComponent } from './components/profile.component';
import { ClientsComponent } from './components/clients.component';
import { ProjectsComponent } from './components/projects.component';
import { MilestonesComponent } from './components/milestones.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './models/user.model';
import { NewUserComponent } from './components/new-user.component';
import { ProjectResolver } from './resolvers/project.resolver';
import { EditUserComponent } from './components/edit-user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'timesheet',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component:  UsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] },
    children: [
      {
        path: 'edit-user',
        component: EditUserComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: [Role.ADMIN] },
      }
    ]
  },
  {
    path: 'timesheet',
    component: TimesheetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'milestones',
    component: MilestonesComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'timesheet'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
