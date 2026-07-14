import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../../shared/material/material.module';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartType
} from 'chart.js';

import { ChangeDetectorRef } from '@angular/core';

import {
  ArcElement,
  Chart,
  Legend,
  PieController,
  Tooltip
} from 'chart.js';

import { DashboardService } from '../services/dashboard';

Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule,
    BaseChartDirective
  ],

  templateUrl:
    './dashboard.html',

  styleUrls:
    ['./dashboard.css']
})

export class Dashboard
  implements OnInit {

  totalEmployees = 0;

  presentToday = 0;

  absentToday = 0;

  totalAttendance = 0;

  totalProjects = 0;

  pendingLeaves = 0;

  approvedLeaves = 0;

  rejectedLeaves = 0;

  pieChartType: ChartType = 'pie';

  leaveChartType: ChartType = 'doughnut';

  leaveChartData:
    ChartConfiguration<'doughnut'>['data']
    = {
      labels: [
        'Approved',
        'Pending',
        'Rejected'
      ],

      datasets: [
        {
          data: [0, 0, 0]
        }
      ]
    };

  pieChartData:
    ChartConfiguration<'pie'>['data']
    = {
      labels: [
        'Present',
        'Absent'
      ],

      datasets: [
        {
          data: [0, 0]
        }
      ]
    };

  constructor(
    private dashboardService:
      DashboardService,

    private cdr:
      ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadDashboardStats();
  }

  loadDashboardStats(): void {

    this.dashboardService
      .getDashboardStats()
      .subscribe({

        next: (response) => {

          this.totalEmployees =
            response.totalEmployees;

          this.presentToday =
            response.presentToday;

          this.absentToday =
            response.absentToday;

          this.totalAttendance =
            response.totalAttendance;

          this.totalProjects =
            response.totalProjects;

          this.pendingLeaves =
            response.pendingLeaves;

          this.approvedLeaves =
            response.approvedLeaves;

          this.rejectedLeaves =
            response.rejectedLeaves;

          this.leaveChartData = {

            labels: [
              'Approved',
              'Pending',
              'Rejected'
            ],

            datasets: [
              {
                data: [
                  this.approvedLeaves,
                  this.pendingLeaves,
                  this.rejectedLeaves
                ],

                backgroundColor: [
                  '#88f68c',
                  '#eece6b',
                  '#f24f44'
                ]
              }
            ]
          };

          console.log(response);

          console.log(
            this.presentToday
          );

          console.log(
            this.absentToday
          );

          this.pieChartData = {

            labels: [
              'Present',
              'Absent'
            ],

            datasets: [
              {
                data: [
                  this.presentToday,
                  this.absentToday
                ],

                backgroundColor: [
                  '#4CAF50',
                  '#F44336'
                ]
              }
            ]
          };
          this.cdr.detectChanges();
        }
      });
  }
}
