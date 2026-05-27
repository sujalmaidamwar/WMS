using WMS.Application.DTOs.Department;

namespace WMS.Application.Interfaces.Services;

public interface
    IDepartmentService
{
    Task<IEnumerable<DepartmentDto>>
        GetAllDepartmentsAsync();

    Task AddDepartmentAsync(
        DepartmentDto departmentDto);
}