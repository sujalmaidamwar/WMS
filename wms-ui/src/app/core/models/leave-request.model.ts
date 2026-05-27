
export interface LeaveRequest {

  leaveRequestId: number;

  employeeId: number;

  leaveType: string;

  fromDate: Date;

  toDate: Date;

  reason: string;

  status: string;
}
