import {
  Component
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
  Router,
  RouterModule
} from '@angular/router';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import { ClientService } from '../service/client';

import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
    selector: 'app-add-client',

    standalone: true,

    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MaterialModule,
        MatCheckboxModule
    ],

    templateUrl: './add-client.html',

    styleUrls: ['./add-client.css']
})

export class AddClient
{
    clientForm: FormGroup;

    constructor(
        private fb:
            FormBuilder,

        private clientService:
            ClientService,

        private router:
            Router
    )
    {
        this.clientForm =
            this.fb.group({

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

    onSubmit(): void
    {
        if (
            this.clientForm.invalid
        ) {
            return;
        }

        this.clientService
            .addClient(
                this.clientForm.value
            )

            .subscribe({

                next: () => {

                    alert(
                        'Client Added Successfully'
                    );

                    this.router.navigate([
                        '/clients'
                    ]);
                }
            });
    }
}
