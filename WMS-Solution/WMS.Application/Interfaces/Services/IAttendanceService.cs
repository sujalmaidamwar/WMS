using WMS.Application.DTOs.Attendance;

namespace WMS.Application.Interfaces.Services;

public interface IAttendanceService
{
    Task<IEnumerable<AttendanceDto>> GetAllAttendanceAsync();

    Task AddAttendanceAsync( AttendanceDto attendanceDto);

    Task<IEnumerable<AttendanceDto>> GetAttendanceByEmployeeId( int employeeId);

    Task<IEnumerable<AttendanceDto>> GetAttendanceByMonth(int employeeId, int month, int year);

    Task CheckInAsync(int employeeId, string workMode);

    Task CheckOutAsync( int employeeId);
}