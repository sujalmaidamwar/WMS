import {
  Component,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MaterialModule } from '../../../shared/material/material.module';

import { DepartmentService } from '../services/department';

//import { ChangeDetectorRef } from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';

@Component({
  selector:
    'app-department-list',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  templateUrl:
    './department-list.html',

  styleUrl:
    './department-list.css'
})

export class DepartmentList
  implements OnInit {

  dataSource =
  new MatTableDataSource<any>();

  departmentForm!: FormGroup;

  displayedColumns: string[] = [
    'departmentId',
    'departmentName',
    'description'
  ];

  constructor(

    private departmentService:
      DepartmentService,

    //private cdr: ChangeDetectorRef,

    private fb:
      FormBuilder
  ) { }

  ngOnInit(): void {

    this.departmentForm =
      this.fb.group({

        departmentName: [
          '',
          Validators.required
        ],

        description: ['']
      });

    this.loadDepartments();
  }

  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (response) => {

          setTimeout(() => {

            this.dataSource.data =
              response;

          });
        }
      });
  }

  addDepartment(): void {

    if (
      this.departmentForm.invalid
    ) {
      return;
    }

    this.departmentService
      .addDepartment(
        this.departmentForm.value
      )
      .subscribe({

        next: () => {

          this.departmentForm
            .reset();

          this.loadDepartments();
        }
      });
  }
}
