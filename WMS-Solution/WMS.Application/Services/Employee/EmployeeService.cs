using WMS.Application.DTOs.Employee;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Domain.Entities;
using BCrypt.Net;
using WMS.Application
.DTOs.AuditLog;

namespace WMS.Application.Services.Employee
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        private readonly
    IAuditLogService
        _auditLogService;
        private readonly
    IUserRepository
        _userRepository;

        public EmployeeService(IEmployeeRepository employeeRepository, IUserRepository userRepository,IAuditLogService auditLogService)
        {
            _employeeRepository = employeeRepository;
            _userRepository = userRepository;
            _auditLogService = auditLogService;
        }

        

        public async Task<IEnumerable<EmployeeDto>> GetAllAsync()
        {
            var employees = await _employeeRepository.GetAllAsync();

            return employees.Where(e => e.User != null &&( e.User.Role == "Employee"||e.User.Role == "Manager" ))
                .Select(e => new EmployeeDto
                {
                EmployeeId = e.EmployeeId,
                FirstName = e.FirstName,
                LastName = e.LastName,
                Email = e.Email,
                PhoneNumber = e.PhoneNumber,
                DepartmentId = e.DepartmentId,
                Role = e.User != null ? e.User.Role : null,
                DepartmentName = e.Department != null ? e.Department.DepartmentName : null,
                DOB = e.DOB,
                DOJ = e.DOJ,
                Status = e.Status,
            });
        }

        public async Task<EmployeeDto> GetByIdAsync(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
                return null;

            return new EmployeeDto
            {
                EmployeeId = employee.EmployeeId,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                Email = employee.Email,
                PhoneNumber = employee.PhoneNumber,
                DepartmentId =
        employee.DepartmentId,

                DepartmentName =
        employee.Department != null
            ? employee.Department.DepartmentName
            : null,
                DOB = employee.DOB,
                DOJ = employee.DOJ,
                Status = employee.Status
            };
        }

        public async Task AddAsync(EmployeeDto employeeDto)
        {
            var employee = new WMS.Domain.Entities.Employee
            {
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                PhoneNumber = employeeDto.PhoneNumber,
                DepartmentId = employeeDto.DepartmentId,
                DOB = employeeDto.DOB,
                DOJ = employeeDto.DOJ,
                Status = employeeDto.Status
            };

            await _employeeRepository.AddAsync(employee);
            var user =
    new User
    {
        Username =
            employeeDto.Email,

        Password =

            BCrypt.Net.BCrypt
                .HashPassword(

                    employeeDto
                        .FirstName
                    + "@123"
                ),

        Role = employeeDto.Role,

        EmployeeId = employeeDto.EmployeeId
    };

            await _userRepository
                .AddUserAsync(user);

            await _auditLogService
    .AddAsync(

        new AuditLogDto
        {
            Action =
                "Add",

            EntityName =
                "Employee",

            Description =
                $"Added employee: {employee.FirstName}",

            PerformedBy =
                "Admin"
        }
    );
        }

        public async Task UpdateAsync(EmployeeDto employeeDto)
        {
            var employee = await _employeeRepository.GetByIdAsync(employeeDto.EmployeeId);

            if (employee == null)
                return;

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
            employee.Email = employeeDto.Email;
            employee.PhoneNumber = employeeDto.PhoneNumber;
            employee.DepartmentId = employeeDto.DepartmentId;
            employee.DOB = employeeDto.DOB;
            employee.DOJ = employeeDto.DOJ;
            employee.Status = employeeDto.Status;

            await _employeeRepository.UpdateAsync(employee);
            await _auditLogService
    .AddAsync(

        new AuditLogDto
        {
            Action =
                "Update",

            EntityName =
                "Employee",

            Description =
                $"Added employee: {employee.FirstName}",

            PerformedBy =
                "Admin"
        }
    );
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
            await _auditLogService
    .AddAsync(

        new AuditLogDto
        {
            Action =
                "Add",

            EntityName =
                "Employee",

            Description =
                $"Deleted Employee with ID: {id}",

            PerformedBy =
                "Admin"
        }
    );
        }
    }
}