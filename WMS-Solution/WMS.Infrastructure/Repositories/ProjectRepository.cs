using Microsoft.EntityFrameworkCore;

using WMS.Application
.Interfaces.Repositories;

using WMS.Domain.Entities;

using WMS.Infrastructure.Data;

namespace WMS.Infrastructure
.Repositories;

public class ProjectRepository
    : IProjectRepository
{
    private readonly
        ApplicationDbContext
            _context;

    public ProjectRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<
        IEnumerable<Project>>
        GetAllAsync()
    {
        return await _context
            .Projects

            .Include(p => p.Employees)
            .Include(p => p.Client)

            .ToListAsync();
    }

    public async Task AddAsync(
        Project project)
    {
        await _context
            .Projects
            .AddAsync(project);

        await _context
            .SaveChangesAsync();
    }
}