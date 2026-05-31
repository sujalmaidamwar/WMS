using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs;
using WMS.Application.DTOs.Attendance;
using WMS.Application.Interfaces.Services;
using System.Security.Claims;

namespace WMS.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AttendanceController : ControllerBase
{

    private readonly IAttendanceService _attendanceService;

    public AttendanceController(IAttendanceService attendanceService)
    {
        _attendanceService = attendanceService;
    }



    [HttpGet]
    public async Task<IActionResult> GetAttendance()
    {
        var attendance = await _attendanceService.GetAllAttendanceAsync();

        return Ok(attendance);
    }



    [HttpPost]
    public async Task<IActionResult> AddAttendance(
        AttendanceDto attendanceDto)
    {
        await _attendanceService.AddAttendanceAsync(attendanceDto);

        return Ok(new
        {
            message = "Attendance added successfully"
        });
    }



    [Authorize(Roles = "Employee,Manager")]
    [HttpGet("my-attendance")]
    public async Task<IActionResult> GetMyAttendance()
    {
        var employeeIdClaim = User.FindFirst("EmployeeId")?.Value;

        if (string.IsNullOrEmpty(employeeIdClaim))
        {
            return Unauthorized();
        }

        int employeeId = Convert.ToInt32(employeeIdClaim);

        var attendance =
            await _attendanceService.GetAttendanceByEmployeeId(employeeId);

        return Ok(attendance);
    }



    [HttpGet("employee/{employeeId}/month")]
    public async Task<IActionResult> GetAttendanceByMonth(
        int employeeId,
        int month,
        int year)
    {
        var attendance =
            await _attendanceService.GetAttendanceByMonth(
                employeeId,
                month,
                year
            );

        return Ok(attendance);
    }



    [Authorize(Roles = "Employee,Manager")]
    [HttpPost("checkin")]
    public async Task<IActionResult> CheckIn(
        int employeeId,
        string workMode)
    {
        try
        {
            await _attendanceService.CheckInAsync(
                employeeId,
                workMode
            );

            return Ok(new
            {
                message = "Checked In Successfully"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }



    [Authorize(Roles = "Employee,Manager")]
    [HttpPost("checkout")]
    public async Task<IActionResult> CheckOut(int employeeId)
    {
        try
        {
            await _attendanceService.CheckOutAsync(employeeId);

            return Ok(new
            {
                message = "Checked Out Successfully"
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new
            {
                message = ex.Message
            });
        }
    }
}