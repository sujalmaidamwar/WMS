using AutoMapper;

using WMS.Application.DTOs.Attendance;
using WMS.Application.DTOs.Department;
using WMS.Application.DTOs.Employee;
using WMS.Application.DTOs.Leave;
using WMS.Domain.Entities;

namespace WMS.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Employee, EmployeeDto>()

    .ForMember(

        dest => dest.DepartmentName,

        opt => opt.MapFrom(src =>

            src.Department!
                .DepartmentName
        )
    )

    .ReverseMap();

        CreateMap<Attendance, AttendanceDto>()
            .ReverseMap();

        CreateMap<LeaveRequest, LeaveRequestDto>()
    .ReverseMap();

        CreateMap<
    Department,
    DepartmentDto>()
    .ReverseMap();
    }
}