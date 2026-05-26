using Microsoft.AspNetCore.Mvc;

using WMS.Application
.DTOs.Project;

using WMS.Application
.Interfaces.Services;

namespace WMS.API.Controllers;

[Route("api/[controller]")]

[ApiController]

public class ProjectController
    : ControllerBase
{
    private readonly
        IProjectService
            _projectService;

    public ProjectController(

        IProjectService
            projectService)
    {
        _projectService =
            projectService;
    }

    [HttpGet]

    public async Task<
        IActionResult>
        GetAllProjects()
    {
        var projects =
            await _projectService
                .GetAllProjectsAsync();

        return Ok(projects);
    }

    [HttpPost]

    public async Task<
        IActionResult>
        AddProject(
            ProjectDto projectDto)
    {
        await _projectService
            .AddProjectAsync(
                projectDto);

        return Ok(new
        {
            success = true,

            message =
                "Project added successfully"
        });
    }
}