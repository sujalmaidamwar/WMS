using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs.Employee;
using WMS.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }


        
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _employeeService.GetAllAsync();
            return Ok(employees);
        }

        

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeService.GetByIdAsync(id);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeDto employeeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Validation Failed",
                    errors = ModelState.Values
                        .SelectMany(v => v.Errors)
                        .Select(e => e.ErrorMessage)
                });
            }

            await _employeeService.AddAsync(employeeDto);

            return Ok(new
            {
                success = true,
                message = "Employee Added Successfully"
            });
        }

        

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            await _employeeService.DeleteAsync(id);

            return Ok(new
            {
                message = "Employee Deleted Successfully"
            });
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(
            int id,
            EmployeeDto employeeDto)
        {
            employeeDto.EmployeeId = id;

            await _employeeService.UpdateAsync(employeeDto);

            return Ok(new
            {
                success = true,
                message = "Employee updated successfully"
            });
        }



        [HttpGet("EmployeesOnly")]
        public async Task<IActionResult> GetEmployeesOnly()
        {
            var employees = await _employeeService.GetEmployeesOnlyAsync();

            return Ok(employees);
        }



        [HttpGet("ManagersOnly")]
        public async Task<IActionResult> GetManagersOnly()
        {
            var managers = await _employeeService.GetManagersOnlyAsync();

            return Ok(managers);
        }
    }
}