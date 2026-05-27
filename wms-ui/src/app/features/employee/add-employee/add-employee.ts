import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MaterialModule } from '../../../shared/material/material.module';

import { DepartmentService } from '../../department/services/department';
import { EmployeeService } from '../services/employee';

@Component({
  selector: 'app-add-employee',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  templateUrl: './add-employee.html',

  styleUrls: ['./add-employee.css']
})

export class AddEmployee {

  employeeForm: FormGroup;
  departments: any[] = [];

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private departmentService:
      DepartmentService
  ) {

    this.employeeForm = this.fb.group({

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phoneNumber: ['', Validators.required],

      departmentId: ['', Validators.required],

      dob: ['', Validators.required],

      doj: ['', Validators.required],

      status: ['Active'],

      role: ['Employee']
    });

    this.loadDepartments();
  }

  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (response) => {

          setTimeout(() => {

            this.departments =
              response;

          });
        }
      });
  }

  onSubmit(): void {

    if (this.employeeForm.invalid) {
      return;
    }

    this.employeeService
      .addEmployee(this.employeeForm.value)
      .subscribe({

        next: () => {

          alert('Employee Added Successfully');

          this.router.navigate(['/employees']);
        },

        error: (error) => {

          console.log(error);

          alert('Failed to Add Employee');
        }
      });
  }
}
