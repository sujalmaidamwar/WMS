import {
  ChangeDetectorRef,
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

import { MaterialModule } from '../../../shared/material/material.module';

import { LeaveRequestService } from '../services/leave-request';

import { LeaveRequest } from '../../../core/models/leave-request.model';

import { EmployeeService } from '../../employee/services/employee';

import { Employee } from '../../../core/models/employee.model';

import { AuthService } from '../../../core/services/auth';


@Component({
  selector: 'app-leave-management',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  templateUrl:
    './leave-management.html',

  styleUrls:
    ['./leave-management.css']
})

export class LeaveManagementComponent
  implements OnInit {

  leaveForm!: FormGroup;

  leaveRequests: LeaveRequest[] = [];

  employees: Employee[] = [];

  displayedColumns: string[] = [

    'employeeId',

    'leaveType',

    'fromDate',

    'toDate',

    'status',

    'actions'
  ];

  constructor(

    private fb: FormBuilder,

    private leaveRequestService:
      LeaveRequestService,

    private employeeService:
      EmployeeService,

    private cdr:
      ChangeDetectorRef,

    private authService: AuthService
  ) { }

  ngOnInit(): void {

    this.initializeForm();

    if (
      this.isAdmin() ||
      this.isManager()
    ) {

      this.loadEmployees();
    }

    if (
      this.isEmployee()
    ) {

      const employeeId =
        this.authService
          .getEmployeeId();

      this.leaveForm.patchValue({
        employeeId: employeeId
      });

      console.log(
        'EmployeeId:',
        employeeId
      );
    }

    this.loadLeaveRequests();
  }

  isEmployee(): boolean {

    return this.authService
      .isEmployee();
  }

  initializeForm(): void {

    this.leaveForm =
      this.fb.group({

        employeeId: [
          '',
          Validators.required
        ],

        leaveType: [
          '',
          Validators.required
        ],

        fromDate: [
          '',
          Validators.required
        ],

        toDate: [
          '',
          Validators.required
        ],

        reason: [
          '',
          Validators.required
        ],

        status: ['Pending']
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

  loadLeaveRequests(): void {

    this.leaveRequestService
      .getLeaveRequests()
      .subscribe({

        next: (response) => {

          if (
            this.isAdmin()
          ) {

            this.leaveRequests =
              response;
          }
          else {

            const employeeId =
              this.authService
                .getEmployeeId();

            this.leaveRequests =
              response.filter(
                x =>
                  x.employeeId ===
                  employeeId
              );
          }

          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {

    if (
      this.isEmployee()
    ) {

      this.leaveForm.patchValue({

        employeeId:
          this.authService
            .getEmployeeId()

      });
    }

    console.log(
      'Leave Payload:',
      this.leaveForm.value
    );

    if (
      this.leaveForm.invalid
    ) {
      return;
    }

    this.leaveRequestService
      .addLeaveRequest(
        this.leaveForm.value
      )
      .subscribe({

        next: () => {

          alert(
            'Leave Request Submitted'
          );

          this.leaveForm.reset();

          if (
            this.isEmployee()
          ) {

            this.leaveForm.patchValue({

              employeeId:
                this.authService
                  .getEmployeeId()

            });
          }

          this.loadLeaveRequests();
        },

        error: (error) => {

          console.log(error);

          alert(
            'Failed to submit leave request'
          );
        }
      });
  }

  approveLeave(id: number): void {

    this.leaveRequestService
      .approveLeave(id)
      .subscribe({

        next: () => {

          alert('Leave Approved');

          this.loadLeaveRequests();
        }
      });
  }

  rejectLeave(id: number): void {

    this.leaveRequestService
      .rejectLeave(id)
      .subscribe({

        next: () => {

          alert('Leave Rejected');

          this.loadLeaveRequests();
        }
      });
  }

  isAdmin(): boolean {

    return this.authService
      .isAdmin();
  }

  isManager(): boolean {

    return this.authService
      .isManager();
  }

  cancelLeave(
    id: number
  ): void {

    const confirmCancel =
      confirm(
        'Cancel this leave?'
      );

    if (!confirmCancel)
      return;

    this.leaveRequestService
      .deleteLeave(id)
      .subscribe({

        next: () => {

          this.loadLeaveRequests();
          this.cdr.detectChanges();
          this.loadLeaveRequests();
        }
      });
  }
}
