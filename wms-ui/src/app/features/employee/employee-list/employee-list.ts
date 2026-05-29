import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { Employee } from '../../../core/models/employee.model';
import { MaterialModule } from '../../../shared/material/material.module';

import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-employee-list',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule

  ],

  templateUrl: './employee-list.html',

  styleUrls: ['./employee-list.css']
})

export class EmployeeListComponent
  implements OnInit {

  employees: Employee[] = [];

  displayedColumns: string[] = [
    'employeeId',
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'departmentName',
    'status',
    'actions'
  ];

  constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadEmployees();

  }

  loadEmployees(): void {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (response) => {

          this.employees = response;

          this.cdr.detectChanges();

          console.log(this.employees);
          console.log(this.employees.length);
        },

        error: (error) => {

          console.log(error);
        }
      });
  }


  deleteEmployee(id: number): void {

    const confirmDelete =
      confirm(
        'Are you sure you want to delete this employee?'
      );

    if (!confirmDelete) {
      return;
    }

    this.employeeService
      .deleteEmployee(id)
      .subscribe({

        next: () => {

          alert('Employee Deleted');

          this.loadEmployees();
        },

        error: (error) => {

          console.log(error);
          console.log("FULL ERROR:", error);

          console.log("ROLE ERROR:",error.error.errors.Role );

          console.log("STATUS:", error.status);

          alert(JSON.stringify(error.error));
          alert('Delete Failed');
        }
      });
  }
}
