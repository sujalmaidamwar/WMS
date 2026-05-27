import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { LeaveRequest } from '../../../core/models/leave-request.model';

@Injectable({
  providedIn: 'root'
})

export class LeaveRequestService {

  private apiUrl =
    `${environment.apiBaseUrl}/LeaveRequest`;

  constructor(
    private http: HttpClient
  ) {}

  getLeaveRequests():
    Observable<LeaveRequest[]>
  {
    return this.http.get<
      LeaveRequest[]
    >(this.apiUrl);
  }

  addLeaveRequest(
    leaveRequest: LeaveRequest
  ): Observable<any>
  {
    return this.http.post(
      this.apiUrl,
      leaveRequest
    );
  }

  approveLeave(
    id: number
  ): Observable<any>
  {
    return this.http.put(
      `${this.apiUrl}/approve/${id}`,
      {}
    );
  }

  rejectLeave(
    id: number
  ): Observable<any>
  {
    return this.http.put(
      `${this.apiUrl}/reject/${id}`,
      {}
    );
  }

  deleteLeave(id: number)
{
  return this.http.delete(

    `${this.apiUrl}/${id}`

  );
}
}
