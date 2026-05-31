using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs.Leave;
using WMS.Application.Interfaces.Services;
using System.Security.Claims;

namespace WMS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class LeaveRequestController : ControllerBase
{
    private readonly ILeaveRequestService _leaveRequestService;

    public LeaveRequestController(
        ILeaveRequestService leaveRequestService)
    {
        _leaveRequestService = leaveRequestService;
    }


    [HttpGet]
    public async Task<IActionResult> GetLeaveRequests()
    {
        var leaveRequests =
            await _leaveRequestService.GetAllLeaveRequestsAsync();

        return Ok(leaveRequests);
    }



    [HttpPost]
    public async Task<IActionResult> AddLeaveRequest(
        LeaveRequestDto leaveRequestDto)
    {
        await _leaveRequestService.AddLeaveRequestAsync(
            leaveRequestDto);

        return Ok(new
        {
            message = "Leave Request Submitted"
        });
    }



    [Authorize(Roles = "Admin,Manager")]
    [HttpPut("approve/{id}")]
    public async Task<IActionResult> ApproveLeave(int id)
    {
        await _leaveRequestService.ApproveLeaveAsync(id);

        return Ok(new
        {
            message = "Leave Approved"
        });
    }



    [Authorize(Roles = "Admin,Manager")]
    [HttpPut("reject/{id}")]
    public async Task<IActionResult> RejectLeave(int id)
    {
        await _leaveRequestService.RejectLeaveAsync(id);

        return Ok(new
        {
            message = "Leave Rejected"
        });
    }



    [Authorize(Roles = "Employee")]
    [HttpGet("my-leaves")]
    public async Task<IActionResult> GetMyLeaves()
    {
        var employeeIdClaim =
            User.FindFirst("EmployeeId")?.Value;

        if (string.IsNullOrEmpty(employeeIdClaim))
        {
            return Unauthorized();
        }

        int employeeId =
            Convert.ToInt32(employeeIdClaim);

        var leaves =
            await _leaveRequestService.GetLeavesByEmployeeId(
                employeeId);

        return Ok(leaves);
    }



    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteLeave(int id)
    {
        await _leaveRequestService.DeleteLeaveAsync(id);

        return Ok(new
        {
            message = "Leave cancelled successfully"
        });
    }
}