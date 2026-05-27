import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';

import { AttendanceService } from '../services/attendance';

import { Attendance } from '../../../core/models/attendance.model';

import { EmployeeService } from '../../employee/services/employee';

import { FormsModule } from '@angular/forms';
import { Employee } from '../../../core/models/employee.model';
import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-attendance-list',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule
  ],

  templateUrl:
    './attendance-list.html',

  styleUrls:
    ['./attendance-list.css']
})

export class AttendanceListComponent
  implements OnInit {

  attendanceForm!: FormGroup;

  attendanceList: Attendance[] = [];

  employees: Employee[] = [];

  selectedEmployeeId = 0;

  workMode = 'WFO';

  selectedMonth =
    new Date().getMonth() + 1;

  selectedYear =
    new Date().getFullYear();

  months = [

    { value: 1, name: 'January' },

    { value: 2, name: 'February' },

    { value: 3, name: 'March' },

    { value: 4, name: 'April' },

    { value: 5, name: 'May' },

    { value: 6, name: 'June' },

    { value: 7, name: 'July' },

    { value: 8, name: 'August' },

    { value: 9, name: 'September' },

    { value: 10, name: 'October' },

    { value: 11, name: 'November' },

    { value: 12, name: 'December' }
  ];

  displayedColumns: string[] = [
    'attendanceId',
    'employeeId',
    'attendanceDate',
    'status',
    'checkInTime',
    'checkOutTime',
    'totalHours',
    'workMode'
  ];

  constructor(
    private fb: FormBuilder,
    private attendanceService:
      AttendanceService,
    private employeeService:
      EmployeeService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    this.loadEmployees();

    this.selectedEmployeeId =

      this.authService
        .getEmployeeId();

    this.filterAttendance();

    console.log(

      this.authService
        .getRole()

    );
  }

  initializeForm(): void {

    this.attendanceForm =
      this.fb.group({

        employeeId: [
          '',
          Validators.required
        ],

        attendanceDate: [
          new Date().toISOString().split('T')[0],
          Validators.required
        ],

        status: [
          '',
          Validators.required
        ]
      });
  }

  loadEmployees(): void {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (response) => {

          this.employees = response;

          this.cdr.detectChanges();
        }
      });
  }

  loadAttendance(): void {

    this.attendanceService
      .getAttendance()
      .subscribe({

        next: (response) => {

          this.attendanceList =

            response.filter(

              (e: any) =>

                e.role
                  ?.toLowerCase()

                ===

                'employee'
            );

          this.cdr.detectChanges();
        }
      });
  }

  isEmployee(): boolean {

    return this.authService
      .isEmployee();
  }

  isAdmin(): boolean {

    return this.authService
      .isAdmin();
  }

  isManager(): boolean {

    return this.authService
      .isManager();
  }

  onSubmit(): void {

    if (
      this.attendanceForm.invalid
    ) {
      return;
    }

    this.attendanceService
      .addAttendance(
        this.attendanceForm.value
      )
      .subscribe({

        next: () => {

          alert(
            'Attendance Added'
          );

          this.initializeForm();

          this.loadAttendance();
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  filterAttendance(): void {

    this.attendanceService

      .getAttendanceByMonth(

        this.selectedEmployeeId,

        this.selectedMonth,

        this.selectedYear
      )

      .subscribe({

        next: (response: any) => {

          this.attendanceList =
            response;

          this.cdr.detectChanges();
          // this.loadAttendance();
          console.log(response);
        }
      });
  }

  checkIn(): void {

    this.attendanceService

      .checkIn(

        this.selectedEmployeeId,

        this.workMode
      )

      .subscribe({

        next: () => {

          alert(
            'Checked In Successfully'
          );

          this.filterAttendance();
        }
      });
  }

  checkOut(): void {

    this.attendanceService

      .checkOut(
        this.selectedEmployeeId
      )

      .subscribe({

        next: () => {

          alert(
            'Checked Out Successfully'
          );

          this.filterAttendance();
        }
      });
  }
}
