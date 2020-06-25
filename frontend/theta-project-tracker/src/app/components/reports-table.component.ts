import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-reports-table',
  template: `
  <div class="wrapper">
  <table mat-table [dataSource]="items|keyvalue" class="mat-elevation-z8" matSort>
  <ng-container matColumnDef="projects">
    <th mat-header-cell *matHeaderCellDef mat-sort-header></th>
    <td mat-cell *matCellDef="let element"> {{element.key}} </td>
  </ng-container>
  <ng-container *ngFor="let col of displayedColumns | slice:1" matColumnDef="{{col}}">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>{{col}}</th>
    <td mat-cell *matCellDef="let element"> {{element.value[col]}} </td>
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

export class ReportsTableComponent implements OnInit {
  displayedColumns = [];
  firstColumnName = 'projects';
  items;
  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.reportsService.getReportsByProjectHour().subscribe(users => {
      this.items = users;
      this.getColumnNames(this.items);
    });
  }

  getColumnNames = (source: object) => {
    let columnNames = [];
    Object.values(source).forEach(x => {
      columnNames = columnNames.concat(Object.keys(x));
    });
    let uniqueColumnNames = new Set(columnNames);
    uniqueColumnNames.delete('total');
    uniqueColumnNames.forEach(element => {
      this.displayedColumns.push(element);
    });
    this.displayedColumns.push('total');
    this.displayedColumns.unshift(this.firstColumnName);
  }
}