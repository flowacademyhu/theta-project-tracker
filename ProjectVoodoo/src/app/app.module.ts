import { UsersComponent } from './components/users.component';
import { ReportsComponent } from './components/reports.component';
import { HeaderComponent } from './components/header.component';
import { LoginComponent } from './components/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar.component';
import { TimesheetComponent } from './components/timesheet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ReportsComponent,
    CalendarComponent,
    TimesheetComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
