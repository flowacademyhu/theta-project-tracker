import { Role } from './models/user.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <router-outlet></router-outlet>
        `,
  styles: [`
    .mat-sidenav-container {
      height: auto;
    }
  `],

})

export class AppComponent {
  title = 'theta-project-tracker';
}
