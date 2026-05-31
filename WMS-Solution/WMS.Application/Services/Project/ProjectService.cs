using WMS.Application.DTOs.Project;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Domain.Entities;
using WMS.Application.DTOs.AuditLog;

namespace WMS.Application.Services.Project;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly IAuditLogService _auditLogService;

    public ProjectService(
        IProjectRepository projectRepository,
        IEmployeeRepository employeeRepository,
        IAuditLogService auditLogService)
    {
        _projectRepository = projectRepository;
        _employeeRepository = employeeRepository;
        _auditLogService = auditLogService;
    }


    public async Task<IEnumerable<ProjectDto>> GetAllProjectsAsync()
    {
        var projects = await _projectRepository.GetAllAsync();

        return projects.Select(p =>
            new ProjectDto
            {
                ProjectId = p.ProjectId,
                ProjectName = p.ProjectName,
                Description = p.Description,
                StartDate = p.StartDate,
                EndDate = p.EndDate,

                EmployeeIds = p.Employees.Select(e => e.EmployeeId).ToList(),

                EmployeeNames = p.Employees.Select(e => e.FirstName + " " + e.LastName).ToList(),

                ClientId = p.ClientId,

                ClientName = p.Client != null? p.Client.ClientName: null,
            });
    }

    public async Task AddProjectAsync( ProjectDto projectDto)
    {
        var employees = await _employeeRepository.GetAllAsync();

        var selectedEmployees =
            employees.Where(e =>
                projectDto.EmployeeIds.Contains(
                    e.EmployeeId
                )
            ).ToList();

        var project =
            new Domain.Entities.Project
            {
                ProjectName = projectDto.ProjectName,
                Description = projectDto.Description,
                StartDate = projectDto.StartDate,
                EndDate = projectDto.EndDate,
                Employees = selectedEmployees,
                ClientId = projectDto.ClientId,
            };

        await _projectRepository.AddAsync(project);

        await _auditLogService.AddAsync(
            new AuditLogDto
            {
                Action = "Add",
                EntityName = "Project",
                Description = $"Added project: {project.ProjectName}",
                PerformedBy = "Admin"
            }
        );
    }
}