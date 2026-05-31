using WMS.Application.DTOs;
using WMS.Application.DTOs.Leave;
using WMS.Application.Interfaces.Repositories;

namespace WMS.Application.Interfaces.Services;

public interface ILeaveRequestService
{
    Task<IEnumerable<LeaveRequestDto>> GetAllLeaveRequestsAsync();

    Task AddLeaveRequestAsync( LeaveRequestDto leaveRequestDto);

    Task ApproveLeaveAsync(int id);

    Task RejectLeaveAsync(int id);

    Task<IEnumerable<LeaveRequestDto>> GetLeavesByEmployeeId( int employeeId);

    Task DeleteLeaveAsync(int id);
}