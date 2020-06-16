import { ReportsComponent } from './components/reports.component';
import { UsersComponent } from './components/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { TimesheetComponent } from './components/timesheet.component';
import { CalendarComponent } from './components/calendar.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
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
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
