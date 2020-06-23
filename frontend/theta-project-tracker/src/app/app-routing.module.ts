import { AppComponent } from './app.component';
import { ReportsComponent } from './components/reports.component';
import { UsersComponent } from './components/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { TimesheetComponent } from './components/timesheet.component';
import { CalendarComponent } from './components/calendar.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Role } from './models/user.model';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    component:  UsersComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
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
    component: CalendarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'milestones',
    component: CalendarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'clients',
    component: CalendarComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
