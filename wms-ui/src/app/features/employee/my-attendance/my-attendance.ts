import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  ChangeDetectorRef
} from '@angular/core';

import { MaterialModule } from '../../../shared/material/material.module';

import { AttendanceService } from '../../attendance/services/attendance';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-my-attendance',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule
  ],

  templateUrl:
    './my-attendance.html',

  styleUrl:
    './my-attendance.css'
})

export class MyAttendance
  implements OnInit {

  attendanceRecords:
    any[] = [];

  workMode = 'WFO';

  displayedColumns: string[] = [

    'attendanceDate',

    'checkInTime',

    'checkOutTime',

    'totalHours',

    'workMode',

    'status'
  ];

  constructor(

    private attendanceService:
      AttendanceService, private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.loadAttendance();
  }

  loadAttendance(): void {

    this.attendanceService
      .getMyAttendance()
      .subscribe({

        next: (response) => {

          this.attendanceRecords =
            response;

          this.cdr.detectChanges();
        }
      });
  }

  checkIn(): void {

    const employeeId =

      this.authService
        .getEmployeeId();

    this.attendanceService

      .checkIn(
        employeeId,
        this.workMode
      )

      .subscribe({

        next: () => {

          alert(
            'Checked In Successfully'
          );

          this.loadAttendance();
        },

        error: (error) => {

          alert(
            error.error.message
          );
        }
      });
  }

  checkOut(): void {

    const employeeId =

      this.authService
        .getEmployeeId();

    this.attendanceService

      .checkOut(employeeId)

      .subscribe({

        next: () => {

          alert(
            'Checked Out Successfully'
          );

          this.loadAttendance();
        },
        error: (error) => {

          alert(
            error.error.message
          );
        }
      });
  }
}
