using AutoMapper;

using WMS.Application.DTOs.Attendance;

using WMS.Application.Interfaces.Repositories;

using WMS.Application.Interfaces.Services;

using WMS.Domain.Entities;

namespace WMS.Application.Services;

public class AttendanceService
    : IAttendanceService
{
    private readonly IAttendanceRepository
        _attendanceRepository;

    private readonly IMapper _mapper;

    public AttendanceService(
        IAttendanceRepository attendanceRepository,
        IMapper mapper)
    {
        _attendanceRepository =
            attendanceRepository;

        _mapper = mapper;
    }

    public async Task<IEnumerable<AttendanceDto>>
        GetAllAttendanceAsync()
    {
        var attendance =
            await _attendanceRepository
                .GetAllAsync();

        return _mapper.Map
            <IEnumerable<AttendanceDto>>
            (attendance);
    }

    public async Task AddAttendanceAsync(
     AttendanceDto attendanceDto)
    {
        attendanceDto.AttendanceDate =
            DateTime.Today;

        var existingAttendance =
            await _attendanceRepository
                .GetAttendanceByEmployeeAndDate(

                    attendanceDto.EmployeeId,

                    attendanceDto.AttendanceDate
                );

        if (existingAttendance != null)
        {
            existingAttendance.Status =
                attendanceDto.Status;

            await _attendanceRepository
                .UpdateAsync(
                    existingAttendance);

            return;
        }

        var attendance =
            _mapper.Map<Attendance>(
                attendanceDto);

        await _attendanceRepository
            .AddAsync(attendance);
    }

    public async Task<
    IEnumerable<AttendanceDto>>
    GetAttendanceByEmployeeId(
        int employeeId)
    {
        var attendance =
            await _attendanceRepository
                .GetAttendanceByEmployeeId(
                    employeeId);

        return _mapper.Map<
            IEnumerable<AttendanceDto>>(
                attendance);
    }

    public async Task<
    IEnumerable<AttendanceDto>>
GetAttendanceByMonth(

    int employeeId,

    int month,

    int year)
    {
        var attendance =
            await _attendanceRepository

                .GetAttendanceByMonth(

                    employeeId,

                    month,

                    year
                );

        return attendance.Select(a =>
            new AttendanceDto
            {
                AttendanceId =
                    a.AttendanceId,

                EmployeeId =
                    a.EmployeeId,

                AttendanceDate =
                    a.AttendanceDate,

                Status =
                    a.Status
            });
    }
}