import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { Router }
from '@angular/router';

import { MaterialModule }
from '../../shared/material/material.module';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    MaterialModule
  ],

  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css']
})

export class Navbar {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}
