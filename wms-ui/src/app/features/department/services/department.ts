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

export class DepartmentService {

  private apiUrl =
    'https://localhost:7152/api/Department';

  constructor(
    private http: HttpClient
  ) {}

  getDepartments():
    Observable<any>
  {
    return this.http.get(
      this.apiUrl
    );
  }

  addDepartment(
    department: any)
  {
    return this.http.post(
      this.apiUrl,
      department
    );
  }
}
