import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { MaterialModule } from '../../../shared/material/material.module';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  isLoading = false;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {

    console.log('Login button clicked');

    console.log(this.loginForm.value);

    console.log(this.loginForm.valid);

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.authService.login(this.loginForm.value)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(response.token);

          const role =
            this.authService.getRole();

          if (role === 'Admin') {
            this.router.navigate(
              ['/dashboard']
            );
          }

          else if (role === 'Manager') {
            this.router.navigate(
              ['/employees']
            );
          }

          else if (role === 'Employee') {
            this.router.navigate(
              ['/my-attendance']
            );
          }
        },

        error: (error) => {

          this.errorMessage =
            error.error.message || 'Login Failed';

          this.isLoading = false;
        }
      });
  }


}
