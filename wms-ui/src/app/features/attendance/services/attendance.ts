import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Attendance } from '../../../core/models/attendance.model';

@Injectable({
  providedIn: 'root'
})

export class AttendanceService {

  private apiUrl =
    `${environment.apiBaseUrl}/attendance`;

  constructor(
    private http: HttpClient
  ) { }

  getAttendance():
    Observable<Attendance[]> {
    return this.http.get<Attendance[]>(
      this.apiUrl
    );
  }

  addAttendance(
    attendance: Attendance
  ): Observable<any> {
    return this.http.post(
      this.apiUrl,
      attendance
    );
  }

  getMyAttendance():
    Observable<any> {
    return this.http.get(
      `${this.apiUrl}/my-attendance`
    );
  }

  getAttendanceByMonth(

    employeeId: number,

    month: number,

    year: number
  ) {
    return this.http.get(

      `${this.apiUrl}/employee/${employeeId}/month?month=${month}&year=${year}`

    );
  }

  checkIn(

    employeeId: number,

    workMode: string
  ) {

    return this.http.post(

      `${this.apiUrl}/checkin`,

      {},

      {
        params: {

          employeeId,

          workMode
        }
      }
    );
  }

  checkOut(
    employeeId: number
  ) {

    return this.http.post(

      `${this.apiUrl}/checkout`,

      {},

      {
        params: {
          employeeId
        }
      }
    );
  }
}
