import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User, ProjectAssigned } from 'src/app/models/user.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-one-week',
  template: `
  <div class="wrapper">
  <table mat-table [dataSource]="dataSource">
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef class="secondary"></th>
      <td mat-cell *matCellDef="let project"> <strong>{{ project.projectName }} </strong>
        <p>project.milestone</p>
      </td>
      <td mat-footer-cell *matFooterCellDef></td>
    </ng-container>
    <ng-container matColumnDef="activity">
      <th mat-header-cell *matHeaderCellDef class="secondary"></th>
      <td mat-cell *matCellDef="let project">project.activity?</td>
      <td mat-footer-cell *matFooterCellDef></td>
    </ng-container>
    <ng-container matColumnDef="addDescription">
      <th mat-header-cell *matHeaderCellDef class="secondary"></th>
      <td mat-cell *matCellDef="let project">
        <mat-icon>sms</mat-icon>
      </td>
      <td mat-footer-cell *matFooterCellDef> Total </td>
    </ng-container>
    <div class="days">
      <form [formGroup]="timeSheet">
        <ng-container matColumnDef="monday">
          <th mat-header-cell *matHeaderCellDef> Monday {{03.16}}</th>
          <td mat-cell *matCellDef="let project; let i = index">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput formControlName="mondayNormalTime">
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT" formControlName="mondayOverTime">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef>
            <p>{{ timeSheet.get('mondayNormalTime').value }}</p>
            <p [ngStyle]="{color: 'red'}">{{ timeSheet.get('mondayOverTime').value }}</p>
          </td>
        </ng-container>
        <ng-container matColumnDef="tuesday">
          <th mat-header-cell *matHeaderCellDef> Tuesday {{03.17}}</th>
          <td mat-cell *matCellDef="let project">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="wednesday">
          <th mat-header-cell *matHeaderCellDef> Wednesday {{03.18}}</th>
          <td mat-cell *matCellDef="let project">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="thursday">
          <th mat-header-cell *matHeaderCellDef> Thursday {{03.19}}</th>
          <td mat-cell *matCellDef="let project">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="friday">
          <th mat-header-cell *matHeaderCellDef> Friday 03.20</th>
          <td mat-cell *matCellDef="let project">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="saturday">
          <th mat-header-cell *matHeaderCellDef> Saturday {{03.21}}</th>
          <td mat-cell *matCellDef="let project">
            <mat-form-field appearance="outline" color="primary">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
        <ng-container matColumnDef="sunday">
          <th mat-header-cell *matHeaderCellDef> Sunday {{03.22}}</th>
          <td mat-cell *matCellDef="let project" color="primary">
            <mat-form-field appearance="outline">
              <input type="number" matInput>
            </mat-form-field>
            <mat-form-field appearance="outline" color="warn">
              <input type="number" matInput placeholder="OT">
            </mat-form-field>
          </td>
          <td mat-footer-cell *matFooterCellDef></td>
        </ng-container>
      </form>
    </div>
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef></th>
      <td mat-cell *matCellDef="let project">
        <button mat-icon-button>
          <mat-icon>edit</mat-icon>
        </button>
        <button mat-icon-button>
          <mat-icon>clear</mat-icon>
        </button>
        <button mat-icon-button (click)="onSaveRecords(project)">
          <mat-icon>save</mat-icon>
        </button>
      </td>
      <td mat-footer-cell *matFooterCellDef></td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
  </table>
  <button mat-raised-button color="warn" (click)="onSaveTimeSheet()">Save</button>
</div>
  `,
  styles: [`
  mat-form-field {
    width: 60px;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
   table {
    height: 400px;
    margin: auto;
    width: 80%;
    overflow: auto;
    margin-top: 150px
}
td {
  text-align: left;
  vertical-align: middle;
}
.secondary {
  width: 120px;
}
  `]
})
export class RecordOneWeekComponent implements OnInit {

  constructor(private authService: AuthService) { }
  loggedInUser: User;
  dataSource: ProjectAssigned[];
  first: ProjectAssigned;
  ngOnInit(): void {
    this.loggedInUser = this.authService.getAdmin();
    this.dataSource = this.loggedInUser.projectAssigned;
    this.first = this.dataSource[0];
  }

  displayedColumns: string[] = ['name', 'activity', 'addDescription', 'monday', 'tuesday',
    'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'actions'];

  timeSheet = new FormGroup({
    mondayNormalTime: new FormControl(),
    mondayOverTime: new FormControl()
  })
  onSaveTimeSheet() {
    console.log(this.timeSheet)
    console.log(this.first);
  }
  onSaveRecords(project) {
    console.log(project)
    console.log(this.timeSheet)
  }
  getDailyTotal() {
    return this.timeSheet.get('mondayNormalTime').value + this.timeSheet.get('mondayOverTime').value;
  }
}
