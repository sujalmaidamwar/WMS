using WMS.Application
.DTOs.Project;

namespace WMS.Application
.Interfaces.Services;

public interface
    IProjectService
{
    Task<IEnumerable<ProjectDto>>
        GetAllProjectsAsync();

    Task AddProjectAsync(
        ProjectDto projectDto);
}