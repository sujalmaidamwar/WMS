using Microsoft.AspNetCore.Mvc;

using WMS.Application
.DTOs.Department;

using WMS.Application
.Interfaces.Services;

namespace WMS.API.Controllers;

[Route("api/[controller]")]

[ApiController]

public class DepartmentController
    : ControllerBase
{
    private readonly
        IDepartmentService
            _departmentService;

    public DepartmentController(

        IDepartmentService
            departmentService)
    {
        _departmentService =
            departmentService;
    }

    [HttpGet]

    public async Task<
        IActionResult>
        GetAllDepartments()
    {
        var departments =
            await _departmentService
                .GetAllDepartmentsAsync();

        return Ok(departments);
    }

    [HttpPost]

    public async Task<
        IActionResult>
        AddDepartment(
            DepartmentDto departmentDto)
    {
        await _departmentService
            .AddDepartmentAsync(
                departmentDto);

        return Ok(new
        {
            message =
                "Department added successfully"
        });
    }
}