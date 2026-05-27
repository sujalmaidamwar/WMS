import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { MaterialModule } from '../../../shared/material/material.module';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-profile',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule
  ],

  templateUrl:
    './profile.html',

  styleUrls:
    ['./profile.css']
})

export class Profile {

  username = '';

  role = '';

  constructor(

    private authService:
      AuthService,

    private router:
      Router
  ) {

    this.loadUserDetails();
  }

  loadUserDetails(): void {

    const token =
      this.authService.getToken();

    if (!token) {
      return;
    }

    const payload =
      JSON.parse(
        atob(token.split('.')[1])
      );

    this.username =
      payload[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];

    this.role =
      payload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(
      ['/login']
    );
  }
}
