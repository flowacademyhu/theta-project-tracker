import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Subscription } from 'rxjs';
import { Project } from '../models/project.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reports-table',
  template: `
  <div class="wrapper">
  <button id="excel" mat-raised-button>Export to Excel</button>
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
    <ng-container matColumnDef="availableProjects">
      <th mat-header-cell *matHeaderCellDef></th>
      <td mat-cell *matCellDef="let project"> {{project.name}} project</td>
    </ng-container>
    <ng-container *ngFor="let user of displayedColumns | slice:1:displayedColumns.length-1; let i = index">
      <ng-container [matColumnDef]="displayedColumns[i+1]">
        <th mat-header-cell *matHeaderCellDef> {{ user }} </th>
        <td mat-cell *matCellDef="let project"> {{ getHours(i) }} </td>
      </ng-container>
    </ng-container>
    <ng-container matColumnDef="total">
      <th mat-header-cell *matHeaderCellDef><strong>Total</strong></th>
      <td mat-cell *matCellDef="let project"> <strong>{{ getTotalHours() }}</strong> </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
  `,
  styles: [`
  .wrapper {
    margin: auto;
    width: 70%;
    margin-top: 200px
  }
  table {
    width: 100%;
  }
  `]
})

export class ReportsTableComponent implements OnInit, OnDestroy {
  constructor(private projectService: ProjectService, private userService: UserService) { }

  subscriptions$: Subscription[] = [];
  @Input() columns: string;
  @Input() rows: string;
  dataSource: Project[] = [];
  displayedColumns: string[] = ['availableProjects'];
  ngOnInit() {
    this.subscriptions$.push(this.projectService.projects$.subscribe(value => {
      this.dataSource = value;
    }));
    this.subscriptions$.push(this.userService.users$.subscribe(value => {
      let contractors = value.map(c => c.firstName + ' ' + c.lastName);
      this.displayedColumns.push(...contractors);
      console.log(this.displayedColumns)
      this.displayedColumns.push('total')
    }))
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
  getHours(i: number) {
    let hour = 0;
    this.userService.users$.subscribe(value => {
      console.log(value[i].costToCompanyPerHour)
      hour = value[i].costToCompanyPerHour
    })
    return hour;
  }
  getTotalHours() {
    let total = 0;
    this.userService.users$.subscribe(value => {
      value.map(c => c.costToCompanyPerHour).forEach(e => total += e);
    })
    return total;
  }
}