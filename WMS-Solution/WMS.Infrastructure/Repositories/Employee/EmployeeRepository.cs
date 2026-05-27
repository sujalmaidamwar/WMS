using Microsoft.EntityFrameworkCore;
using WMS.Application.Interfaces.Repositories;
using WMS.Domain.Entities;
using WMS.Infrastructure.Data;

namespace WMS.Infrastructure.Repositories.Employee
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WMS.Domain.Entities.Employee>> GetAllAsync()
        {
            return await _context.Employees

    .Include(e => e.Department)

    .Include(e => e.User)

    .ToListAsync();
        }

        public async Task<WMS.Domain.Entities.Employee> GetByIdAsync(int id)
        {
            return await _context.Employees

    .Include(e => e.Department)

    .Include(e => e.User)

    .FirstOrDefaultAsync(
        e => e.EmployeeId == id
    );

        }

        public async Task AddAsync(WMS.Domain.Entities.Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(WMS.Domain.Entities.Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee != null)
            {
                _context.Employees.Remove(employee);
                await _context.SaveChangesAsync();
            }
        }
    }
}