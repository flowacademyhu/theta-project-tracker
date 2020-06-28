import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  styles: [
    `
      table {
        width: 100%;
      }
      
      mat-icon {
        cursor: pointer;
      }

      th.mat-sort-header-sorted {
        color: black;
      }
    `
  ]
})
export class TableComponent implements OnInit {
  displayedColumns = [];
  firstColumnName = 'projects';
  items;
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.getReport().subscribe(users => {
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
