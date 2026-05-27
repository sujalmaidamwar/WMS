import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

import { AddAnnouncement } from './features/announcement/add-announcement/add-announcement';
import { AnnouncementList } from './features/announcement/announcement-list/announcement-list';
import { AttendanceListComponent } from './features/attendance/attendance-list/attendance-list';
import { Login } from './features/auth/login/login';
import {
  ClientList
} from './features/client/client-list/client-list';
import { Dashboard } from './features/dashboard/dashboard/dashboard';
import {
  DepartmentList
} from './features/department/department-list/department-list';
import { AddEmployee } from './features/employee/add-employee/add-employee';
import { EditEmployee } from './features/employee/edit-employee/edit-employee';
import { EmployeeListComponent } from './features/employee/employee-list/employee-list';
import { MyAttendance } from './features/employee/my-attendance/my-attendance';
import { LeaveManagementComponent } from './features/leave/leave-management/leave-management';
import { Profile } from './features/profile/profile/profile';
import { ProjectList } from './features/project/project-list/project-list';
import { AttendanceReport } from './features/reports/attendance-report/attendance-report';
import { MainLayout } from './layout/main-layout/main-layout';

import {
  AddClient
} from './features/client/add-client/add-client';

import {
  EditClient
} from './features/client/edit-client/edit-client';

import {
  AuditLogList
} from './features/audit-log/audit-log-list/audit-log-list';





export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: '',

    component: MainLayout,

    canActivate: [authGuard],

    children: [

      {
        path: 'dashboard',

        component: Dashboard,

        canActivate: [roleGuard],

        data: {
          roles: ['Admin']
        }
      },

      {
        path: 'employees',

        component:
          EmployeeListComponent,

        canActivate: [roleGuard],

        data: {
          roles: ['Admin', 'Manager']
        }
      },
      {
        path: 'my-attendance',

        component:
          MyAttendance,

        canActivate: [roleGuard],

        data: {
          roles: ['Employee']
        }
      },

      {
        path: 'add-employee',

        component: AddEmployee,

        canActivate: [roleGuard],

        data: {
          roles: ['Admin', 'Manager']
        }
      },

      {
        path: 'edit-employee/:id',

        component: EditEmployee,

        canActivate: [roleGuard],

        data: {
          roles: ['Admin', 'Manager']
        }
      },

      {
        path: 'attendance',

        component:
          AttendanceListComponent,

        canActivate: [roleGuard],

        data: {
          roles: ['Admin', 'Manager']
        }
      },

      {
        path: 'audit-logs',

        component:
          AuditLogList,

        canActivate: [
          roleGuard
        ],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'leave-management',

        component:
          LeaveManagementComponent,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager',
            'Employee'
          ]
        }
      },

      {
        path: 'profile',

        component: Profile,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager',
            'Employee'
          ]
        }
      },

      {
        path: 'departments',

        component:
          DepartmentList,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      },
      {
        path: 'projects',

        component:
          ProjectList,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      },

      {
        path: 'announcements',

        component:
          AnnouncementList,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager',
            'Employee'
          ]
        }
      },

      {
        path: 'add-announcement',

        component:
          AddAnnouncement,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin'
          ]
        }
      },

      {
        path: 'attendance-report',

        component:
          AttendanceReport,

        canActivate: [roleGuard],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      },

      {
        path: 'clients',

        component:
          ClientList,

        canActivate: [
          roleGuard
        ],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      },

      {
        path: 'add-client',

        component:
          AddClient,

        canActivate: [
          roleGuard
        ],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      },

      {
        path: 'edit-client/:id',

        component:
          EditClient,

        canActivate: [
          roleGuard
        ],

        data: {
          roles: [
            'Admin',
            'Manager'
          ]
        }
      }
    ]
  },



  {
    path: '**',
    redirectTo: 'login'

  }
];
