import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomMaterialModule } from './custom-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';

// OUR COMPONENTS + STUFF
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar.component';
import { ReportsComponent } from './components/reports.component';
import { NewUserComponent } from './components/new-user.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HighlightDirective } from './directives/highlite.directive';
import { MilestonesComponent } from './components/milestones.component';
import { ClientsComponent } from './components/clients.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { TimesheetComponent } from './components/timesheet.component';
import { UsersComponent } from './components/users.component';
import { NewUserModalComponent } from '../app/modals/new-user-modal.component';
import { DeleteModalComponent } from '../app/modals/delete-modal.component';
import { NewClientModalComponent } from '../app/modals/new-client-modal-component';
import { ClientManagementComponent } from '../app/components/client-management-component';
import { RecordOneWeekComponent } from '../app/components/record-one-week.component'

@NgModule({
  declarations: [
    AppComponent,
    NewUserModalComponent,
    NewUserComponent,
    UsersComponent,
    DeleteModalComponent,
    ClientsComponent,
    NewClientModalComponent,
    ClientManagementComponent,
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
    MatDialogModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatFormFieldModule,
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
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
