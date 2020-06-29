import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SidenavContainerComponent } from './components/sidenav-container.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// OUR COMPONENTS + STUFF
import { NewClientModalComponent } from '../app/modals/new-client-modal-component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProjectsComponent } from './components/projects.component';
import { NewProjectModalComponent } from './modals/new-project-modal.component';
import { NewProjectComponent } from './components/new-project.component';
import { ReportsComponent } from './components/reports.component';
import { LoginComponent } from './components/login.component';
import { HeaderComponent } from './components/header.component';
import { TimesheetComponent } from './components/timesheet.component';
import { NewUserModalComponent } from '../app/modals/new-user-modal.component';
import { NewUserComponent } from '../app/components/new-user.component';
import { UsersComponent } from '../app/components/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar.component';
import { DeleteModalComponent } from '../app/modals/delete-modal.component';

import { MilestonesComponent } from './components/milestones.component';
import { ClientsComponent } from './components/clients.component';
import { ClientManagementComponent } from '../app/components/client-management-component';
import { ReportsTableComponent } from '../app/components/reports-table.component'

import { NewMilestoneModalComponent } from './modals/new-milestone-modal.component';
import { NewMilestoneComponent } from './components/new-milestone.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { RecordOneWeekComponent } from './components/record-one-week.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { ConfirmModalComponent } from './modals/confirm-modal.component';

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
export function appInit(provider: AuthService) {
  return (): Promise<any> => provider.fetchCurrentUserOnApplication();
}

@NgModule({
  declarations: [
    AppComponent,
    NewUserModalComponent,
    NewUserComponent,
    UsersComponent,
    DeleteModalComponent,
    ClientsComponent,
    ClientManagementComponent,
    CalendarComponent,
    TimesheetComponent,
    HeaderComponent,
    LoginComponent,
    ReportsComponent,
    MilestonesComponent,
    RecordOneWeekComponent,
    SidenavContainerComponent,
    NewClientModalComponent,
    NewProjectComponent,
    NewProjectModalComponent,
    ProjectsComponent,
    NewMilestoneComponent,
    NewMilestoneModalComponent,
    ReportsTableComponent,
    ConfirmModalComponent
  ],
  imports: [
    MatSidenavModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatGridListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      }
    })
  ],
  providers: [  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  {
    provide: APP_INITIALIZER,
      useFactory: appInit,
      deps: [AuthService],
      multi: true,
  }
],
  bootstrap: [AppComponent],
  entryComponents: [DeleteModalComponent, NewClientModalComponent, NewProjectModalComponent]
})
export class AppModule { }  
