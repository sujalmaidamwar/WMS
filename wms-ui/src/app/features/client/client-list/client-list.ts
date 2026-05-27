import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import { ClientService } from '../service/client';

import {
  Client
} from '../../../core/models/client.model';

import {
  AuthService
} from '../../../core/services/auth';

import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-client-list',

    standalone: true,

    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ],

    templateUrl: './client-list.html',

    styleUrls: ['./client-list.css']
})

export class ClientList
implements OnInit
{
    clients: Client[] = [];

    displayedColumns: string[] = [
        'clientName',
        'companyName',
        'email',
        'phoneNumber',
        'status',
        'actions'
    ];

    constructor(
        private clientService:
            ClientService,

        private authService:
            AuthService,

        private cdr : ChangeDetectorRef
    ) {}

    ngOnInit(): void
    {
        this.loadClients();
    }

    loadClients(): void
    {
        this.clientService
            .getClients()

            .subscribe({

                next: (response) => {

                    this.clients =
                        response;

                    this.cdr.detectChanges();
                }
            });
    }

    deleteClient(id: number): void
    {
        if (
            !confirm(
                'Delete Client?'
            )
        ) {
            return;
        }

        this.clientService
            .deleteClient(id)

            .subscribe({

                next: () => {

                    alert(
                        'Client Deleted Successfully'
                    );

                    this.loadClients();
                }
            });
    }

    isAdmin(): boolean
    {
        return this.authService
            .isAdmin();
    }

    isManager(): boolean
    {
        return this.authService
            .isManager();
    }
}
