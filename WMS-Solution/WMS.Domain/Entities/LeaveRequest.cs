using System.ComponentModel.DataAnnotations.Schema;

namespace WMS.Domain.Entities;

public class LeaveRequest
{
    public int LeaveRequestId { get; set; }

    public int EmployeeId { get; set; }

    public string LeaveType { get; set; }
        = string.Empty;

    public DateTime FromDate { get; set; }

    public DateTime ToDate { get; set; }

    public string Reason { get; set; }
        = string.Empty;

    public string Status { get; set; }
        = "Pending";

    [ForeignKey("EmployeeId")]
    public Employee? Employee { get; set; }
}