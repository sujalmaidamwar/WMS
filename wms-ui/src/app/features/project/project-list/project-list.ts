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

import { ProjectService } from '../services/project';

import { EmployeeService } from '../../employee/services/employee';

import { ChangeDetectorRef } from '@angular/core';
import { ClientService } from '../../client/service/client';

@Component({
  selector:
    'app-project-list',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],

  templateUrl:
    './project-list.html',

  styleUrls:
    ['./project-list.css']
})

export class ProjectList
  implements OnInit {

  projects: any[] = [];

  employees: any[] = [];

  clients: any[] = [];

  projectForm!: FormGroup;

  displayedColumns: string[] = [
    'projectId',
    'projectName',
    'description',
    'startDate',
    'endDate',
    'clientName',
    'employees'
  ];

  constructor(

    private projectService:
      ProjectService,

    private employeeService:
      EmployeeService,

    private fb:
      FormBuilder,

    private cdr: ChangeDetectorRef,

    private clientService: ClientService
  ) { }

  ngOnInit(): void {

    this.projectForm =
      this.fb.group({

        projectName: [
          '',
          Validators.required
        ],

        description: [''],

        startDate: [
          '',
          Validators.required
        ],

        endDate: [
          '',
          Validators.required
        ],

        clientId: [
          null,
          Validators.required
        ],

        employeeIds: [[]]
      });

    this.loadProjects();
    this.loadClients();
    this.loadEmployees();
  }

  loadProjects(): void {

    this.projectService
      .getProjects()
      .subscribe({

        next: (response) => {

          this.projects =
            response;
          this.cdr.detectChanges();
        }
      });
  }

  loadClients(): void {

    this.clientService
      .getClients()

      .subscribe({

        next: (response) => {

          this.clients =
            response;

          this.cdr.detectChanges();
        }
      });
  }

  loadEmployees(): void {

    this.employeeService
      .getEmployees()
      .subscribe({

        next: (response) => {

          this.employees =
            response;

          this.cdr.detectChanges();
        }
      });
  }

  addProject(): void {

    if (
      this.projectForm.invalid
    ) {
      return;
    }

    this.projectService
      .addProject(
        this.projectForm.value
      )
      .subscribe({

        next: () => {

          this.projectForm
            .reset();

          this.loadProjects();
        }
      });
  }
}
