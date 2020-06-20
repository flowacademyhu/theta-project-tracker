import { AppComponent } from './app.component';
import { ReportsComponent } from './components/reports.component';
import { UsersComponent } from './components/users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { TimesheetComponent } from './components/timesheet.component';
import { CalendarComponent } from './components/calendar.component';
import { ClientsComponent } from './components/clients.component';
import { ClientsResolver } from './resolvers/client.resolver';

const routes: Routes = [
/*   {
    path: '',
    component: LoginComponent
  }, */
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
    path: 'projects',
    component: CalendarComponent,
  },
  {
    path: 'milestones',
    component: CalendarComponent,
  },
  {
    path: 'clients',
    component: ClientsComponent
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
