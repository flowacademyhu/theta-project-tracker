import { ReportsComponent } from './../component/reports.component';
import { UsersComponent } from './../component/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../component/login.component';
import { TimesheetComponent } from '../component/timesheet.component';
import { CalendarComponent } from '../component/calendar.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/characters',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component:  UsersComponent
  },
  {
    path: 'timesheet',
    component: TimesheetComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
