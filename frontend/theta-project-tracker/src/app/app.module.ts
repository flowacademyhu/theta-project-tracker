import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportsComponent } from './components/reports.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { TimesheetComponent } from './components/timesheet.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewUserModalComponent } from '../app/modals/new-user-modal.component';
import { DeleteModalComponent } from '../app/modals/delete-modal.component';
import { NewUserComponent } from '../app/components/new-user.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsersComponent } from '../app/components/users.component';
import { ProjectsComponent } from './components/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarComponent } from './components/calendar.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import { HighlightDirective } from './directives/highlite.directive';
import { MilestonesComponent } from './components/milestones.component';
import { ClientsComponent } from './components/clients.component';

import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { NewMilestoneModalComponent } from './modals/new-milestone-modal.component';
import { NewMilestoneComponent } from './components/new-milestone.component';
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    ProjectsComponent,
    NewMilestoneModalComponent,
    NewMilestoneComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatPaginatorModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  
