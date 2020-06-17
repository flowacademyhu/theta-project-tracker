import { Role } from './models/user.model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <main>
      <mat-sidenav-container>
          <mat-sidenav>
              Sidenav content
          </mat-sidenav>
          <!-- Body -->
      </mat-sidenav-container>
        <mat-sidenav mode="side" align="start" opened>
            Sidenav content
        </mat-sidenav>
        <!-- Body -->


      <!-- Body -->

  </main>
`,
})
export class AppComponent {
  title = 'theta-project-tracker';
}
