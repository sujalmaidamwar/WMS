import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../shared/material/material.module';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],

  templateUrl: './sidebar.html',

  styleUrls: ['./sidebar.css']
})

export class Sidebar {
  constructor(
    private authService:
      AuthService
  ) { }

  isAdmin(): boolean {

    return this.authService
      .isAdmin();
  }

  isManager(): boolean {

    return this.authService
      .isManager();
  }

  isEmployee(): boolean {

    return this.authService
      .isEmployee();
  }
}
