import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client.model';
import { DeleteModalComponent } from 'src/app/modals/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { NewClientModalComponent } from 'src/app/modals/new-client-modal-component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  template: `
  <div>
  <mat-card class="table-container">
    <div>
      <button (click)="onAddNewClient()" mat-raised-button>+ Add New Client</button>
      <mat-table [dataSource]="clients" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Client's Name</mat-header-cell>
          <mat-cell *matCellDef="let client">{{ client.name }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="description">
          <mat-header-cell *matHeaderCellDef>Description</mat-header-cell>
          <mat-cell *matCellDef="let client">{{ client.description }}</mat-cell>
        </ng-container>
        <ng-container matColumnDef="actions" class="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let client">
            <mat-icon (click)="onOpenEditModal(client)">edit</mat-icon>
            <mat-icon (click)="onOpenDeleteModal(client)">clear</mat-icon>
          </mat-cell>
        </ng-container>
        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
    </div>
  </mat-card>
</div>
  `,
  styles: [`
  .table-container {
    margin: auto;
    max-width: 70%;
    height: 400px;
    overflow: auto;
    margin-top: 200px
  }
  mat-icon:hover {
    cursor: pointer;
  }
  `]
})
export class ClientsComponent implements OnInit, OnDestroy {

  subscriptions$: Subscription[] = [];
  clients: Client[] = [];
  displayedColumns = ['name', 'description', 'actions'];

  constructor(private clientService: ClientService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.fetchClients().subscribe(clients => {
      this.clients = clients;
    })
  }
  ngOnDestroy(): void {
    this.subscriptions$.forEach(sub => sub.unsubscribe());
  }
  onOpenEditModal(client) {
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      width: '50%',
      height: '50%',
      data: { clientToEdit: client }
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.fetchClients().subscribe(clients => {
          this.clients = clients;
        });
      }
    }));
  }
  onOpenDeleteModal(client) {
    const nameToPass = this.clients.find(c => c.id === client.id).name;
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: { name: nameToPass },
      width: '25%',
      height: '25%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe();
      }
    }));
  }
  onAddNewClient() {
    const dialogRef = this.dialog.open(NewClientModalComponent, {
      width: '50%',
      height: '50%'
    });
    this.subscriptions$.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.fetchClients().subscribe(c => {
          this.clients = c;
        })
      }
    }));
  }
}
