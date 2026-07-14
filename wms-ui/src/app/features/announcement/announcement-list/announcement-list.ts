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

import { RouterModule } from '@angular/router';

import { AnnouncementService } from '../service/announcement';

import {
  Announcement
} from '../../../core/models/announcement.model';

import {
  ChangeDetectorRef
} from '@angular/core';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector:
    'app-announcement-list',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],

  templateUrl:
    './announcement-list.html',

  styleUrls:
    ['./announcement-list.css']
})

export class
  AnnouncementList
  implements OnInit {
  announcements:
    Announcement[] = [];

  displayedColumns:
    string[] = [

      'title',

      'message',

      'createdOn',

      'isActive',

      'actions'
    ];

  constructor(
    private announcementService:
      AnnouncementService,

    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loadAnnouncements();
  }

  loadAnnouncements():
    void {
    this
      .announcementService

      .getAnnouncements()

      .subscribe({

        next: (response) => {

          this.announcements =
            response;

          this.cdr.detectChanges();
        }
      });
  }


  isAdmin(): boolean {

    return this.authService
      .isAdmin();
  }

  isManager(): boolean {

    return this.authService
      .isManager();
  }


  deleteAnnouncement(
    id: number
  ): void {

    if (
      !confirm(
        'Delete Announcement?'
      )
    ) {
      return;
    }

    this
      .announcementService

      .deleteAnnouncement(id)

      .subscribe({

        next: () => {

          alert(
            'Announcement Deleted'
          );

          this.loadAnnouncements();
          this.cdr.detectChanges()
        }
      });
  }
}
