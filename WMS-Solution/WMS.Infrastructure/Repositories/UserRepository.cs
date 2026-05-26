using Microsoft.EntityFrameworkCore;

using WMS.Application
.Interfaces.Repositories;

using WMS.Domain.Entities;

using WMS.Infrastructure.Data;

namespace WMS.Infrastructure
.Repositories;

public class UserRepository
    : IUserRepository
{
    private readonly
        ApplicationDbContext
            _context;

    public UserRepository(
        ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task
        AddUserAsync(
            User user)
    {
        await _context.Users
            .AddAsync(user);

        await _context
            .SaveChangesAsync();
    }

    public async Task<User?>
        GetByUsernameAsync(
            string username)
    {
        return await _context
            .Users

            .FirstOrDefaultAsync(u =>

                u.Username ==
                    username
            );
    }
}