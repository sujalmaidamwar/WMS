using WMS.Application.DTOs.Leave;
using WMS.Domain.Entities;

namespace WMS.Application.Interfaces.Repositories;

public interface ILeaveRequestRepository
{
    Task<IEnumerable<LeaveRequest>> GetAllAsync();

    Task AddAsync( LeaveRequest leaveRequest);

    Task UpdateAsync( LeaveRequest leaveRequest);

    Task<LeaveRequest?> GetByIdAsync(int id);

    Task<IEnumerable<LeaveRequest>> GetLeavesByEmployeeId( int employeeId);

    Task DeleteAsync(int id);
}