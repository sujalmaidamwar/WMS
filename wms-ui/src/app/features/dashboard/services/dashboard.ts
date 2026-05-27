import { Injectable } from '@angular/core';

import { Observable, forkJoin, map } from 'rxjs';

import { AttendanceService } from '../../attendance/services/attendance';
import { EmployeeService } from '../../employee/services/employee';

import { DashboardStats } from '../../../core/models/dashboard-stats.model';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor(
    private employeeService:
      EmployeeService,

    private attendanceService:
      AttendanceService
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


        const today =
          new Date()
            .toLocaleDateString('en-CA');

        const todayAttendance =
          data.attendance.filter(a =>

            a.attendanceDate
              .toString()
              .split('T')[0] === today
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

        console.log('TODAY:', today);

        console.log(
          'ATTENDANCE:',
          data.attendance
        );

        console.log(
          'TODAY ATTENDANCE:',
          todayAttendance
        );



        return {

          totalEmployees:
            data.employees.length,

          presentToday,

          absentToday,

          totalAttendance:
            data.attendance.length



        };

      })
    );
  }
}
