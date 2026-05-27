import { Component }
from '@angular/core';

import { CommonModule }
from '@angular/common';

import { RouterOutlet }
from '@angular/router';

import { MaterialModule }
from '../../shared/material/material.module';

import { Sidebar } from '../sidebar/sidebar';

import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-main-layout',

  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    Sidebar,
    Navbar
  ],

  templateUrl: './main-layout.html',

  styleUrls: ['./main-layout.css']
})

export class MainLayout {}
