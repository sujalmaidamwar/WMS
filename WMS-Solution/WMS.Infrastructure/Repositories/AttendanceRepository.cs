using Microsoft.EntityFrameworkCore;
using WMS.Application.Interfaces.Repositories;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories;

public class AttendanceRepository : IAttendanceRepository
{
    private readonly ApplicationDbContext _context;

    public AttendanceRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Attendance>> GetAllAsync()
    {
        return await _context.Attendances.ToListAsync();
    }

    public async Task AddAsync(Attendance attendance)
    {
        await _context.Attendances.AddAsync(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Attendance>> GetAttendanceByEmployeeId(
        int employeeId)
    {
        return await _context.Attendances
            .Where(a => a.EmployeeId == employeeId)
            .ToListAsync();
    }

    public async Task UpdateAsync(Attendance attendance)
    {
        _context.Attendances.Update(attendance);
        await _context.SaveChangesAsync();
    }

    public async Task<Attendance?> GetAttendanceByEmployeeAndDate(
        int employeeId,
        DateTime attendanceDate)
    {
        var date = attendanceDate.Date;

        return await _context.Attendances
            .FirstOrDefaultAsync(a =>
                a.EmployeeId == employeeId &&
                a.AttendanceDate.Year == date.Year &&
                a.AttendanceDate.Month == date.Month &&
                a.AttendanceDate.Day == date.Day);
    }

    public async Task<IEnumerable<Attendance>> GetAttendanceByMonth(
        int employeeId,
        int month,
        int year)
    {
        return await _context.Attendances
            .Where(a =>
                a.EmployeeId == employeeId &&
                a.AttendanceDate.Month == month &&
                a.AttendanceDate.Year == year)
            .ToListAsync();
    }

    public async Task<Attendance?> GetTodayAttendanceAsync(
        int employeeId)
    {
        return await _context.Attendances
            .FirstOrDefaultAsync(a =>
                a.EmployeeId == employeeId &&
                a.AttendanceDate.Date == DateTime.Today);
    }
}