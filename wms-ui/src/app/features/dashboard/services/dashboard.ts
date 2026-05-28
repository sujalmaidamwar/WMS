import { Injectable } from '@angular/core';

import { Observable, forkJoin, map } from 'rxjs';

import { AttendanceService } from '../../attendance/services/attendance';
import { EmployeeService } from '../../employee/services/employee';

import { DashboardStats } from '../../../core/models/dashboard-stats.model';
import { AuthService } from '../../../core/services/auth';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(
    private employeeService:
      EmployeeService,

    private attendanceService:
      AttendanceService,
    private authService: AuthService
  ) { }

  getDashboardStats():
    Observable<DashboardStats> {

    return forkJoin({

      employees:
        this.employeeService
          .getEmployees(),

      attendance:
        this.attendanceService
          .getAttendance()

    }).pipe(

      map((data) => {

        const employeeCount =
          data.employees.filter(
            (employee: any) =>

              employee.role === 'Employee'
          ).length;

        const today =
          new Date()
            .toLocaleDateString('en-CA');

        const employeeIds =
          data.employees

            .filter(
              (employee: any) =>

                employee.role === 'Employee'
            )

            .map(
              (employee: any) =>

                employee.employeeId
            );

        const todayAttendance =
          data.attendance.filter(a =>

            a.attendanceDate
              .toString()
              .split('T')[0] === today

            &&

            employeeIds.includes(
              a.employeeId
            )
          );

        const presentToday =
          todayAttendance.filter(a =>

            a.status.toLowerCase() ===
            'present'

          ).length;

        const absentToday =
          todayAttendance.filter(a =>

            a.status.toLowerCase() ===
            'absent'

          ).length;

        return {

          totalEmployees:
            employeeCount,

          presentToday,

          absentToday,

          totalAttendance:
            data.attendance.length
        };

      })
    );
  }
}
