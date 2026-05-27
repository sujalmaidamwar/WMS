import {
  Injectable
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  environment
} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuditLogService
{
    private apiUrl =
        `${environment.apiBaseUrl}/auditlog`;

    constructor(
        private http:
            HttpClient
    ) {}

    getAuditLogs():
        Observable<any[]>
    {
        return this.http.get<any[]>(
            this.apiUrl
        );
    }
}
