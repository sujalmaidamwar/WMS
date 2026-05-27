import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './shared/material/material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,FormsModule,ReactiveFormsModule,MaterialModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('wms-ui');
}
