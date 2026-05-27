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

import {
  Announcement
} from '../../../core/models/announcement.model';

@Injectable({
  providedIn: 'root'
})

export class
AnnouncementService
{
  private apiUrl =

    `${environment.apiBaseUrl}/announcement`;

  constructor(
    private http: HttpClient
  ) {}

  getAnnouncements():
    Observable<Announcement[]>
  {
    return this.http.get
      <Announcement[]>(
        this.apiUrl
      );
  }

  addAnnouncement(
    data: Announcement
  ): Observable<any>
  {
    return this.http.post(
      this.apiUrl,data
    );
  }

  deleteAnnouncement(
    id: number
  ): Observable<any>
  {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}
