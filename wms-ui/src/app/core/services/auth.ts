import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl =
    `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  login(data: any):
    Observable<any> {
    return this.http.post(
      `${this.apiUrl}/login`,
      data
    );
  }

  saveToken(token: string): void {

    localStorage.setItem(
      'token',
      token
    );
  }

  getToken(): string | null {

    return localStorage.getItem(
      'token'
    );
  }

  logout(): void {

    localStorage.removeItem(
      'token'
    );
  }

  isLoggedIn(): boolean {

    return !!this.getToken();
  }

  getRole(): string | null {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    const payload =
      JSON.parse(
        atob(token.split('.')[1])
      );

    return payload[
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
    ];
  }

  isAdmin(): boolean {

    return this.getRole()
      ?.toLowerCase()

      ===

      'admin';
  }

  isManager(): boolean {

    return this.getRole()
      ?.toLowerCase()

      ===

      'manager';
  }

  isEmployee(): boolean {

    return this.getRole()
      ?.toLowerCase()

      ===

      'employee';
  }

  getEmployeeId(): number {

    const token =
      this.getToken();

    if (!token) {
      return 0;
    }

    const payload =
      JSON.parse(
        atob(
          token.split('.')[1]
        )
      );

    console.log(
      'JWT Payload:',
      payload
    );

    return Number(
      payload['EmployeeId']
    );
  }


}
