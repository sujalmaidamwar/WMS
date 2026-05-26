using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WMS.Application.DTOs.Leave
{
    public class LeaveRequestDto
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
            = string.Empty;
    }
}
