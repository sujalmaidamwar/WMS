using WMS.Application
.DTOs.Project;

using WMS.Application
.Interfaces.Repositories;

using WMS.Application
.Interfaces.Services;

using WMS.Domain.Entities;

namespace WMS.Application
.Services.Project;

public class ProjectService
    : IProjectService
{
    private readonly
        IProjectRepository
            _projectRepository;

    private readonly
        IEmployeeRepository
            _employeeRepository;

    public ProjectService(

        IProjectRepository
            projectRepository,

        IEmployeeRepository
            employeeRepository)
    {
        _projectRepository =
            projectRepository;

        _employeeRepository =
            employeeRepository;
    }

    public async Task<
        IEnumerable<ProjectDto>>
        GetAllProjectsAsync()
    {
        var projects =
            await _projectRepository
                .GetAllAsync();

        return projects.Select(p =>
            new ProjectDto
            {
                ProjectId =
                    p.ProjectId,

                ProjectName =
                    p.ProjectName,

                Description =
                    p.Description,

                StartDate =
                    p.StartDate,

                EndDate =
                    p.EndDate,

                EmployeeIds =
                    p.Employees
                        .Select(e =>
                            e.EmployeeId)
                        .ToList(),

                EmployeeNames = p.Employees
                .Select(e => e.FirstName + " " +e.LastName).ToList(),
            });
    }

    public async Task
        AddProjectAsync(
            ProjectDto projectDto)
    {
        var employees =
            await _employeeRepository
                .GetAllAsync();

        var selectedEmployees =
            employees.Where(e =>

                projectDto.EmployeeIds
                    .Contains(
                        e.EmployeeId
                    )
            ).ToList();

        var project =
            new Domain.Entities.Project
            {
                ProjectName =
                    projectDto.ProjectName,

                Description =
                    projectDto.Description,

                StartDate =
                    projectDto.StartDate,

                EndDate =
                    projectDto.EndDate,

                Employees =
                    selectedEmployees
            };

        await _projectRepository
            .AddAsync(project);
    }
}