using WMS.Domain.Entities;

namespace WMS.Application
.Interfaces.Repositories;

public interface
    IProjectRepository
{
    Task<IEnumerable<Project>>
        GetAllAsync();

    Task AddAsync(
        Project project);
}