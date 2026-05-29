using WMS.Domain.Entities;

namespace WMS.Application
.Interfaces.Repositories;

public interface
    IUserRepository
{
    Task AddUserAsync(
        User user);

    Task<User?>
    GetByUsernameAsync(
        string username);

    Task<User?> GetByEmployeeId(int employeeId);

    Task DeleteUserAsync(int userId);

}