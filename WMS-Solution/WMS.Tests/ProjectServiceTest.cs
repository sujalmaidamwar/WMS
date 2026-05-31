using Moq;
using Xunit;
using FluentAssertions;
using WMS.Application.DTOs.Project;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Application.Services.Project;

namespace WMS.Tests
{
    public class ProjectServiceTests
    {
        private readonly Mock<IProjectRepository> _projectRepositoryMock;
        private readonly Mock<IEmployeeRepository> _employeeRepositoryMock;
        private readonly Mock<IAuditLogService> _auditLogServiceMock;
        private readonly ProjectService _projectService;

        public ProjectServiceTests()
        {
            _projectRepositoryMock = new Mock<IProjectRepository>();

            _employeeRepositoryMock = new Mock<IEmployeeRepository>();

            _auditLogServiceMock = new Mock<IAuditLogService>();

            _projectService =
                new ProjectService(
                    _projectRepositoryMock.Object,
                    _employeeRepositoryMock.Object,
                    _auditLogServiceMock.Object
                );
        }

        [Fact]
        public async Task AddProject_ShouldAddProject()
        {
            // Arrange
            var projectDto = new ProjectDto
            {
                ProjectName = "HRMS",
                Description = "HR Project"
            };

            // Act
            await _projectService.AddProjectAsync(projectDto);

            // Assert
            _projectRepositoryMock.Verify(
                repo => repo.AddAsync(
                    It.IsAny<WMS.Domain.Entities.Project>()
                ),
                Times.Once
            );
        }
    }
}