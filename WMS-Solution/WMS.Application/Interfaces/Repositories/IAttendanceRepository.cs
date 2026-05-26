using WMS.Domain.Entities;

namespace WMS.Application.Interfaces.Repositories;

public interface IAttendanceRepository
{
    Task<IEnumerable<Attendance>>
        GetAllAsync();

    Task AddAsync(Attendance attendance);

    Task<IEnumerable<Attendance>>
    GetAttendanceByEmployeeId(
        int employeeId);

    Task UpdateAsync(
    Attendance attendance);

    Task<Attendance?>
    GetAttendanceByEmployeeAndDate(
        int employeeId,
        DateTime attendanceDate);

    Task<IEnumerable<Attendance>>
GetAttendanceByMonth(
    int employeeId,
    int month,
    int year);
}