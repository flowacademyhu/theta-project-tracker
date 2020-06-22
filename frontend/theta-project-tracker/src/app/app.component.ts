import { Role } from './models/user.model';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


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
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
}
}