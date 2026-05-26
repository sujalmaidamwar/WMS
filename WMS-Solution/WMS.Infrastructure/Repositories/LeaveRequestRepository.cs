using Microsoft.EntityFrameworkCore;

using WMS.Application.Interfaces.Repositories;

using WMS.Domain.Entities;

using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories;

public class LeaveRequestRepository
    : ILeaveRequestRepository
{
    private readonly ApplicationDbContext
        _context;

    public LeaveRequestRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LeaveRequest>>
        GetAllAsync()
    {
        return await _context.LeaveRequests
            .ToListAsync();
    }

    public async Task AddAsync(
        LeaveRequest leaveRequest)
    {
        await _context.LeaveRequests
            .AddAsync(leaveRequest);

        await _context.SaveChangesAsync();
    }

    public async Task<LeaveRequest?>
        GetByIdAsync(int id)
    {
        return await _context.LeaveRequests
            .FindAsync(id);
    }

    public async Task UpdateAsync(
        LeaveRequest leaveRequest)
    {
        _context.LeaveRequests
            .Update(leaveRequest);

        await _context.SaveChangesAsync();
    }

    public async Task<
    IEnumerable<LeaveRequest>>
    GetLeavesByEmployeeId(
        int employeeId)
    {
        return await _context.LeaveRequests

            .Where(l =>
                l.EmployeeId ==
                    employeeId)

            .ToListAsync();
    }

    public async Task
    DeleteAsync(int id)
    {
        var leave =
            await _context.LeaveRequests
                .FindAsync(id);

        if (leave == null)
            return;

        _context.LeaveRequests
            .Remove(leave);

        await _context
            .SaveChangesAsync();
    }
}