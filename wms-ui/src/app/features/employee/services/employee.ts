import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment }
  from '../../../../environments/environment';

import { Employee }
  from '../../../core/models/employee.model';

import { CreateEmployee } from '../../../core/models/create-employee';


@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl =
    `${environment.apiBaseUrl}/employee`;

  constructor(
    private http: HttpClient
  ) { }

  getEmployees(): Observable<Employee[]> {

    return this.http.get<Employee[]>(
      this.apiUrl
    );
  }

  addEmployee(
    employee: CreateEmployee
  ): Observable<any> {

    return this.http.post(
      this.apiUrl,
      employee
    );
  }

  getEmployeeById(
    id: number
  ): Observable<Employee> {

    return this.http.get<Employee>(
      `${this.apiUrl}/${id}`
    );
  }

  updateEmployee(
    id: number,
    employee: Employee
  ): Observable<any> {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      employee
    );
  }

  deleteEmployee(
    id: number
  ): Observable<any> {

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

  getEmployeesOnly():
    Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiUrl}/EmployeesOnly`
    );
  }

  getManagersOnly():
    Observable<Employee[]> {
    return this.http.get<Employee[]>(
      `${this.apiUrl}/ManagersOnly`
    );
  }
}
