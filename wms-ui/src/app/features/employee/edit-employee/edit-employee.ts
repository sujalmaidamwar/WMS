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

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MaterialModule } from '../../../shared/material/material.module';

import { EmployeeService } from '../services/employee';

import {
  ChangeDetectorRef
} from '@angular/core';
import { DepartmentService } from '../../department/services/department';

@Component({
  selector: 'app-edit-employee',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  templateUrl: './edit-employee.html',

  styleUrls: ['./edit-employee.css']
})

export class EditEmployee
  implements OnInit {

  employeeForm!: FormGroup;
  departments: any[] = [];
  isLoaded = false;

  employeeId!: number;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private deptService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.employeeId =
      Number(
        this.route.snapshot.paramMap.get('id')
      );

    this.initializeForm();

    this.loadEmployee();
  }

  initializeForm(): void {

    this.employeeForm = this.fb.group({

      employeeId: [0],

      firstName: ['', Validators.required],

      lastName: ['', Validators.required],

      email: ['', Validators.required],

      phoneNumber: ['', Validators.required],

      role: [{
        value: '',
        disabled: true
      }],

      departmentId: ['', Validators.required],

      dob: ['', Validators.required],

      doj: ['', Validators.required],

      status: ['Active']
    });

    this.loadDepartments();
  }

  loadDepartments(): void {

    this.deptService
      .getDepartments()
      .subscribe({

        next: (response) => {

          this.departments =
            response;
          this.isLoaded = true;

          this.cdr.detectChanges();
        }
      });
  }

  loadEmployee(): void {

    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe({

        next: (response) => {
          console.log("API RESPONSE:", response);

          this.employeeForm.patchValue(response);
        },

        error: (error) => {

          console.log(error);
        }
      });
  }

  onSubmit(): void {

    if (this.employeeForm.invalid) {
      return;
    }

    console.log('Route ID:', this.employeeId);
    console.log('Form Value:', this.employeeForm.value);

    console.log(
      this.employeeForm.value
    );

    this.employeeService
      .updateEmployee(
        this.employeeId,
        this.employeeForm.getRawValue()
      ).subscribe({

        next: () => {

          alert('Employee Updated');

          this.router.navigate(['/employees']);
        },

        error: (error) => {

          console.log(error);
          console.log("FULL ERROR:", error);

          console.log("ERROR BODY:", error.error);

          console.log("STATUS:", error.status);

          alert(JSON.stringify(error.error));

          alert('Update Failed');
        }


      });
  }
}
