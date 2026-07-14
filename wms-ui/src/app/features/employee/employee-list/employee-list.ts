import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { Employee } from '../../../core/models/employee.model';
import { MaterialModule } from '../../../shared/material/material.module';

import { EmployeeService } from '../services/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule

  ],

  templateUrl: './employee-list.html',

  styleUrls: ['./employee-list.css']
})

export class EmployeeListComponent
  implements OnInit {

  allEmployees: Employee[] = [];

  searchText = '';

  selectedDepartment = '';

  selectedRole = '';

  departments: string[] = [];

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

          this.allEmployees = response;

          this.employees = response;

          this.departments =
            [
              ...new Set(
                response.map(
                  employee =>
                    employee.departmentName
                )
              )
            ];

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  filterEmployees(): void {

    this.employees =
      this.allEmployees.filter(employee => {

        const matchesSearch =

          employee.firstName
            .toLowerCase()
            .includes(
              this.searchText
                .toLowerCase()
            )

          ||

          employee.lastName
            .toLowerCase()
            .includes(
              this.searchText
                .toLowerCase()
            )

          ||

          employee.employeeId
            .toString()
            .includes(
              this.searchText
            );

        const matchesDepartment =

          !this.selectedDepartment

          ||

          employee.departmentName ===
          this.selectedDepartment;

        const matchesRole =

          !this.selectedRole

          ||

          employee.role ===
          this.selectedRole;

        return (

          matchesSearch

          &&

          matchesDepartment

          &&

          matchesRole
        );
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

          console.log("ROLE ERROR:", error.error.errors.Role);

          console.log("STATUS:", error.status);

          alert(JSON.stringify(error.error));
          alert('Delete Failed');
        }
      });
  }
}
