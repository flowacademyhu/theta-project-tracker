import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  template: `
    <app-sidenav-container>
    </app-sidenav-container>
       `,
  styles: [`
    :host ::ng-deep.mat-sidenav-container {
      height: calc(100vh - 70px) !important;
    }
    .mat-sidenav-container {
      height: calc(100vh - 70px) !important;
    }
  `],
})
export class AppComponent {
  title = 'theta-project-tracker';
  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
}
}
