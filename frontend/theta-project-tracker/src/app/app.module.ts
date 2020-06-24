import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { NewUserComponent } from './components/new-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomMaterialModule } from './custom-material.module';
import { ReportsComponent } from './components/reports.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { TimesheetComponent } from './components/timesheet.component';
import { UsersComponent } from './components/users.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar.component';
import { NewUserModalComponent } from '../app/modals/new-user-modal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeleteModalComponent } from '../app/modals/delete-modal.component';
import { HighlightDirective } from './directives/highlite.directive';
import { MilestonesComponent } from './components/milestones.component';
import { ClientsComponent } from './components/clients.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RecordOneWeekComponent } from './components/record-one-week.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    CalendarComponent,
    TimesheetComponent,
    HeaderComponent,
    LoginComponent,
    ReportsComponent,
    HighlightDirective,
    MilestonesComponent,
    ClientsComponent,
    NewUserComponent,
    NewUserModalComponent,
    DeleteModalComponent,
    RecordOneWeekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
