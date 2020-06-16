import { UsersComponent } from './component/users.component';
import { ReportsComponent } from './component/reports.component';
import { HeaderComponent } from './component/header.component';
import { LoginComponent } from './component/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './component/calendar.component';
import { TimesheetComponent } from './component/timesheet.component';

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
