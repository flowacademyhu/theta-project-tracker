import { Role } from './models/user.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>`,
  styles: [``],

})

export class AppComponent {
  title = 'theta-project-tracker';
}
