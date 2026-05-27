import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import { ChangeDetectorRef } from '@angular/core';
import {
  AuditLogService
} from '../services/audit-log';


@Component({
    selector:
        'app-audit-log-list',

    standalone: true,

    imports: [
        CommonModule,
        MaterialModule
    ],

    templateUrl:
        './audit-log-list.html',

    styleUrls: [
        './audit-log-list.css'
    ]
})

export class AuditLogList
implements OnInit
{
    auditLogs: any[] = [];

    displayedColumns: string[] = [

        'action',

        'entityName',

        'description',

        'performedBy',

        'performedOn'
    ];

    constructor(
        private auditLogService:
            AuditLogService,

        private cdr : ChangeDetectorRef
    ) {}

    ngOnInit(): void
    {
        this.loadLogs();
    }

    loadLogs(): void
    {
        this.auditLogService
            .getAuditLogs()

            .subscribe({

                next: (response) => {

                    this.auditLogs =
                        response;

                    this.cdr.detectChanges();
                }
            });
    }
}
