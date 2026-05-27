import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterModule
} from '@angular/router';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import { ChangeDetectorRef } from '@angular/core';
import {
  MatCheckboxModule
} from '@angular/material/checkbox';
import { ClientService } from '../service/client';

@Component({
    selector: 'app-edit-client',

    standalone: true,

    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        MatCheckboxModule
    ],

    templateUrl: './edit-client.html',

    styleUrls: ['./edit-client.css']
})

export class EditClient
implements OnInit
{
    clientForm: FormGroup;

    clientId = 0;

    constructor(
        private fb:
            FormBuilder,

        private clientService:
            ClientService,

        private route:
            ActivatedRoute,

        private router:
            Router,
        private cdr : ChangeDetectorRef
    )
    {
        this.clientForm =
            this.fb.group({

                clientId: [0],

                clientName: [
                    '',
                    Validators.required
                ],

                companyName: [
                    '',
                    Validators.required
                ],

                email: [
                    '',
                    Validators.required
                ],

                phoneNumber: [
                    '',
                    Validators.required
                ],

                address: [
                    '',
                    Validators.required
                ],

                isActive: [true]
            });
    }

    ngOnInit(): void
    {
        this.clientId =
            Number(
                this.route.snapshot
                    .paramMap
                    .get('id')
            );

        this.loadClient();
    }

    loadClient(): void
    {
        this.clientService
            .getClientById(
                this.clientId
            )

            .subscribe({

                next: (response) => {

                    this.clientForm.patchValue(response);
                    this.cdr.detectChanges();
                }
            });
    }

    onSubmit(): void
    {
        if (
            this.clientForm.invalid
        ) {
            return;
        }

        this.clientService
            .updateClient(
                this.clientForm.value
            )

            .subscribe({

                next: () => {

                    alert(
                        'Client Updated Successfully'
                    );

                    this.router.navigate([
                        '/clients'
                    ]);
                }
            });
    }
}
