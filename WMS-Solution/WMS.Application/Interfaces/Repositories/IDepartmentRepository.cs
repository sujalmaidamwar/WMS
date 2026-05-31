using WMS.Domain.Entities;

namespace WMS.Application.Interfaces.Repositories;

public interface IDepartmentRepository
{
    Task<IEnumerable<Department>> GetAllAsync();

    Task AddAsync( Department department);
}