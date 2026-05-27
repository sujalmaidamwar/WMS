import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  MaterialModule
} from '../../../shared/material/material.module';

import { AttendanceService } from '../../attendance/services/attendance';

import jsPDF from 'jspdf';

import {
  ChangeDetectorRef
} from '@angular/core';

import autoTable from 'jspdf-autotable';
import { EmployeeService } from '../../employee/services/employee';

@Component({
  selector:
    'app-attendance-report',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],

  templateUrl:
    './attendance-report.html',

  styleUrls:
    ['./attendance-report.css']
})

export class
  AttendanceReport
  implements OnInit {
  attendanceList:
    any[] = [];

  employees: any[] = [];

  selectedEmployeeId =
    0;

  selectedMonth =
    new Date()
      .getMonth() + 1;

  selectedYear =
    new Date()
      .getFullYear();

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

  constructor(
    private attendanceService:
      AttendanceService,
    private cdr: ChangeDetectorRef,
    private employee: EmployeeService


  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {

    this
      .employee

      .getEmployees()

      .subscribe({

        next: (response) => {

          this.employees =
            response;

            this.cdr.detectChanges();
        }
      });
  }

  loadReport(): void {

    this
      .attendanceService

      .getAttendance()

      .subscribe({

        next: (response) => {

          this.attendanceList =
            response.filter(

              (a: any) => {

                const date =
                  new Date(
                    a.attendanceDate
                  );

                const matchesEmployee =

                  this.selectedEmployeeId === 0

                  ||

                  a.employeeId
                  ===
                  this.selectedEmployeeId;

                return (

                  matchesEmployee

                  &&

                  date.getMonth() + 1
                  ===
                  this.selectedMonth

                  &&

                  date.getFullYear()
                  ===
                  this.selectedYear
                );
              }
            );

          this.cdr.detectChanges();
        }
      });
  }

  getEmployeeName(
    employeeId: number
  ): string {

    const employee =

      this.employees.find(

        e =>
          e.employeeId
          ===
          employeeId
      );

    if (!employee) {

      return 'Employee';
    }

    return `${employee.firstName

      } ${employee.lastName
      }`;
  }

  exportPDF(): void {

    const doc =
      new jsPDF();

    const employeeName =

      this.selectedEmployeeId === 0

        ? 'All Employees'

        : this.getEmployeeName(
          this.selectedEmployeeId
        );

    // HEADER

    doc.setFontSize(18);

    doc.text(
      'Workforce Management System',
      14,
      20
    );

    doc.setFontSize(14);

    doc.text(
      'Attendance Report',
      14,
      30
    );

    // REPORT DETAILS

    doc.setFontSize(11);

    doc.text(
      `Employee: ${employeeName}`,
      14,
      42
    );

    doc.text(
      `Month: ${this.months.find(
        m =>
          m.value ===
          this.selectedMonth
      )?.name
      } ${this.selectedYear}`,
      14,
      50
    );

    doc.text(
      `Generated On: ${new Date()
        .toLocaleString()
      }`,
      14,
      58
    );

    // TABLE

    autoTable(doc, {

      startY: 70,

      head: [[

        'Employee ID',

        'Date',

        'Status',

        'Check In',

        'Check Out',

        'Work Mode'
      ]],

      body:

        this.attendanceList
          .map(a => [

            a.employeeId,

            new Date(
              a.attendanceDate
            )
              .toLocaleDateString(),

            a.status,

            a.checkInTime
              ?

              new Date(
                a.checkInTime
              )
                .toLocaleTimeString()

              : '-',

            a.checkOutTime
              ?

              new Date(
                a.checkOutTime
              )
                .toLocaleTimeString()

              : '-',

            a.workMode || '-'
          ]),

      styles: {

        fontSize: 10
      },

      headStyles: {

        fillColor: [63, 81, 181]
      }
    });

    // FOOTER

    doc.text(

      `Total Records: ${this.attendanceList.length
      }`,

      14,

      (doc as any)
        .lastAutoTable
        .finalY + 15
    );

    // SAVE FILE

    doc.save(

      `${employeeName}
    -attendance-report.pdf`
    );
  }
}
