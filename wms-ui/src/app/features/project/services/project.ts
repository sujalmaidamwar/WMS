import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  private apiUrl =
    'https://localhost:7152/api/Project';

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
