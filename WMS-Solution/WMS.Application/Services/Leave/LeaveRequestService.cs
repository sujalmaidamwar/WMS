using AutoMapper;

using WMS.Application.DTOs.Leave;

using WMS.Application.Interfaces.Repositories;

using WMS.Application.Interfaces.Services;

using WMS.Domain.Entities;

namespace WMS.Application.Services;

public class LeaveRequestService
    : ILeaveRequestService
{
    private readonly
        ILeaveRequestRepository
        _leaveRequestRepository;

    private readonly IMapper _mapper;

    public LeaveRequestService(
        ILeaveRequestRepository
            leaveRequestRepository,
        IMapper mapper)
    {
        _leaveRequestRepository =
            leaveRequestRepository;

        _mapper = mapper;
    }

    public async Task<IEnumerable<LeaveRequestDto>>
        GetAllLeaveRequestsAsync()
    {
        var leaveRequests =
            await _leaveRequestRepository
                .GetAllAsync();

        return _mapper.Map
            <IEnumerable<LeaveRequestDto>>
            (leaveRequests);
    }

    public async Task AddLeaveRequestAsync(
        LeaveRequestDto leaveRequestDto)
    {
        var leaveRequest =
            _mapper.Map<LeaveRequest>
            (leaveRequestDto);

        await _leaveRequestRepository
            .AddAsync(leaveRequest);
    }

    public async Task ApproveLeaveAsync(
        int id)
    {
        var leave =
            await _leaveRequestRepository
                .GetByIdAsync(id);

        if (leave != null)
        {
            leave.Status = "Approved";

            await _leaveRequestRepository
                .UpdateAsync(leave);
        }
    }

    public async Task RejectLeaveAsync(
        int id)
    {
        var leave =
            await _leaveRequestRepository
                .GetByIdAsync(id);

        if (leave != null)
        {
            leave.Status = "Rejected";

            await _leaveRequestRepository
                .UpdateAsync(leave);
        }
    }

    public async Task<
    IEnumerable<LeaveRequestDto>>
    GetLeavesByEmployeeId(
        int employeeId)
    {
        var leaves =
            await _leaveRequestRepository
                .GetLeavesByEmployeeId(
                    employeeId);

        return _mapper.Map<
            IEnumerable<LeaveRequestDto>>(
                leaves);
    }

    public async Task
    DeleteLeaveAsync(int id)
    {
        await _leaveRequestRepository
            .DeleteAsync(id);
    }
}