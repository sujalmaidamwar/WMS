using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Domain.Entities;

public class Attendance
{
    public int AttendanceId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime AttendanceDate { get; set; }

    public string Status { get; set; } = string.Empty;

    [ForeignKey("EmployeeId")]
    public Employee? Employee { get; set; }

    public DateTime? CheckInTime { get; set; }

    public DateTime?  CheckOutTime { get; set; }

    public double?  TotalHours { get; set; }

    public string?  WorkMode { get; set; }
}