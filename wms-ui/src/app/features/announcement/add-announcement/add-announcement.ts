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
  Router
} from '@angular/router';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import {
  MatCheckboxModule
} from '@angular/material/checkbox';

import { AnnouncementService } from '../service/announcement';

@Component({
  selector:
    'app-add-announcement',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCheckboxModule
  ],

  templateUrl:
    './add-announcement.html',

  styleUrls:
    ['./add-announcement.css']
})

export class
AddAnnouncement
{
  announcementForm:
    FormGroup;

  constructor(

    private fb:
      FormBuilder,

    private announcementService:
        AnnouncementService,

    private router:
      Router

  ) {

    this.announcementForm =
      this.fb.group({

        title: [

          '',

          Validators.required
        ],

        message: [

          '',

          Validators.required
        ],

        createdBy: [1],

        isActive: [true]
      });
  }

  onSubmit(): void {

    if (
      this.announcementForm
        .invalid
    ) {
      return;
    }

    this
      .announcementService

      .addAnnouncement(

        this
          .announcementForm
          .value
      )

      .subscribe({

        next: () => {

          alert(
            'Announcement Added'
          );

          this.router.navigate(
            ['/announcements']
          );
        },

        error: (error) => {

          console.log(error);

          alert(
            'Failed to Add'
          );
        }
      });
  }

  onCancel() :void{
    this.router.navigate(['/announcements'] );
  }
}
