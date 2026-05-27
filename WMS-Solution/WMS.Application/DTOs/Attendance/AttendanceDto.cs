namespace WMS.Application.DTOs.Attendance;

public class AttendanceDto
{
    public int AttendanceId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime AttendanceDate { get; set; }

    public string Status { get; set; } = string.Empty;
    public DateTime? CheckInTime { get; set; }

    public DateTime?  CheckOutTime { get; set; }

    public double?  TotalHours { get; set; }

    public string? WorkMode { get; set; }
}