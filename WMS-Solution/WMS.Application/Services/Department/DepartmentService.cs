using AutoMapper;

using WMS.Application
.DTOs.Department;

using WMS.Application
.Interfaces.Repositories;

using WMS.Application
.Interfaces.Services;

using WMS.Domain.Entities;

namespace WMS.Infrastructure
.Services;

public class DepartmentService
    : IDepartmentService
{
    private readonly
        IDepartmentRepository
            _departmentRepository;

    private readonly
        IMapper
            _mapper;

    public DepartmentService(

        IDepartmentRepository
            departmentRepository,

        IMapper mapper)
    {
        _departmentRepository =
            departmentRepository;

        _mapper = mapper;
    }

    public async Task<
        IEnumerable<DepartmentDto>>
        GetAllDepartmentsAsync()
    {
        var departments =
            await _departmentRepository
                .GetAllAsync();

        return _mapper.Map<
            IEnumerable<DepartmentDto>>(
                departments);
    }

    public async Task
        AddDepartmentAsync(
            DepartmentDto departmentDto)
    {
        var department =
            _mapper.Map<Department>(
                departmentDto);

        await _departmentRepository
            .AddAsync(department);
    }
}