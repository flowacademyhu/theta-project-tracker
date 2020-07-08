import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { DeleteModalComponent } from 'src/app/modals/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NewClientModalComponent } from 'src/app/modals/new-client-modal-component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  template: `
  <div>
  <mat-card class="table-container">
    <div>
      <button (click)="onAddNewClient()" mat-raised-button>{{'add-client' | translate}}</button>
      <mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>{{'clients-name' | translate}}</mat-header-cell>
          <mat-cell *matCellDef="let client">{{ client.name }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="description">
          <mat-header-cell *matHeaderCellDef>{{'description' | translate}}</mat-header-cell>
          <mat-cell *matCellDef="let client">{{ client.description }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actions" class="actions">
          <mat-header-cell *matHeaderCellDef>{{'actions' | translate}}</mat-header-cell>
          <mat-cell *matCellDef="let client">
            <mat-icon (click)="onOpenEditModal(client)">edit</mat-icon>
            <mat-icon (click)="onOpenDeleteModal(client)" color="warn">delete_forever</mat-icon>
          </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
      <mat-paginator
        [pageSize]="10"
        [pageSizeOptions]="[5, 10, 20]"
        showFirstLastButtons>
      </mat-paginator>
    </div>
  </mat-card>
</div>
  `,
  styles: [`
  .table-container {
    margin: auto;
    max-width: 70%;
    min-height: auto;
    overflow: auto;
    margin-top: 100px;
    margin-bottom: 100px;
  }
  mat-icon:hover {
    cursor: pointer;
  }
  `]
})
export class ClientsComponent implements OnInit, OnDestroy, AfterViewInit {

  subscriptions$: Subscription[] = [];
  clients: Client[] = [];
  displayedColumns = ['name', 'description', 'actions'];
  dataSource: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private clientService: ClientService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.clientService.fetchClients().subscribe((clients) => this.dataSource.data = clients);
  }
  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  onOpenEditModal(client) {
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      width: '35%',
      height: '40%',
      data: { clientToEdit: client }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDataSource();
      }
    }));
  }
  onOpenDeleteModal(client) {
    const nameToPass = this.dataSource.data.find(c => c.id === client.id).name;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '15%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(() => {
          this.updateDataSource();
        });
      }
    }));
  }
  onAddNewClient() {
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      width: '35%',
      height: '40%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateDataSource();
      }
    }));
  }
  updateDataSource() {
    this.clientService.fetchClients().subscribe(clients => {
      this.dataSource.data = clients;
    });
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
}
