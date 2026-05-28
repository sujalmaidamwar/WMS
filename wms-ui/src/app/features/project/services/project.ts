import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

private apiUrl =`${environment.apiBaseUrl}/Project`;

  constructor(
    private http: HttpClient
  ) {}

  getProjects():
    Observable<any>
  {
    return this.http.get(
      this.apiUrl
    );
  }

  addProject(
    project: any)
  {
    return this.http.post(
      this.apiUrl,
      project
    );
  }
}
