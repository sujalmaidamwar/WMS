import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Client } from '../../../core/models/client.model';

@Injectable({
    providedIn: 'root'
})

export class ClientService
{
    private apiUrl =
        `${environment.apiBaseUrl}/client`;

    constructor(
        private http: HttpClient
    ) {}

    getClients():
        Observable<Client[]>
    {
        return this.http.get<Client[]>(
            this.apiUrl
        );
    }

    getClientById(id: number):
        Observable<Client>
    {
        return this.http.get<Client>(
            `${this.apiUrl}/${id}`
        );
    }

    addClient(client: Client):
        Observable<any>
    {
        return this.http.post(
            this.apiUrl,
            client
        );
    }

    updateClient(client: Client):
        Observable<any>
    {
        return this.http.put(
            this.apiUrl,client
        );
    }

    deleteClient(id: number):
        Observable<any>
    {
        return this.http.delete(
            `${this.apiUrl}/${id}`
        );
    }
}
