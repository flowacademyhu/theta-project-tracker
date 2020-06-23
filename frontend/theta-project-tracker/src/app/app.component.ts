import { Role } from './models/user.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `

    <app-sidenav-container>
    </app-sidenav-container>
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
