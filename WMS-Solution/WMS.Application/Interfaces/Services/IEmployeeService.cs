using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Application.DTOs.Employee;

namespace WMS.Application.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<IEnumerable<EmployeeDto>> GetAllAsync();

        Task<EmployeeDto> GetByIdAsync(int id);

        Task AddAsync(EmployeeDto employeeDto);

        Task UpdateAsync(EmployeeDto employeeDto);

        Task DeleteAsync(int id);
        Task<IEnumerable<EmployeeDto>> GetEmployeesOnlyAsync();

        Task<IEnumerable<EmployeeDto>>  GetManagersOnlyAsync();
    }
}
