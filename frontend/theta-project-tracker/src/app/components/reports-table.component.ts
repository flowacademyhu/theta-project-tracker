import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-reports-table',
  template: `
  <div class="wrapper">
  <table mat-table [dataSource]="items|keyvalue" class="mat-elevation-z8" matSort>
  <ng-container matColumnDef="firstColumn">
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

export class ReportsTableComponent implements OnInit, OnChanges {
  displayedColumns = [];
  firstColumnName = 'firstColumn';
  lastColumnName = 'total';
  @Input() filteredItems;
  @Input() items;
  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getColumnNames(this.items);
  }
  ngOnChanges() {
    this.getColumnNames(this.items);
  }
  getColumnNames = (source: object) => {
    this.displayedColumns = [];
    let columnNames = [];
    Object.values(source).forEach(x => {
      columnNames = columnNames.concat(Object.keys(x));
    });
    let uniqueColumnNames = new Set(columnNames);
    uniqueColumnNames.delete(this.lastColumnName);
    uniqueColumnNames.forEach(element => {
      this.displayedColumns.push(element);
    });
    if (columnNames.includes(this.lastColumnName)){
      this.displayedColumns.push(this.lastColumnName);
  }
    this.displayedColumns.unshift(this.firstColumnName);
  }
}
