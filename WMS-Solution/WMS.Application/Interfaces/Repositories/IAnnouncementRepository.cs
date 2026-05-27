using WMS.Domain.Entities;

namespace WMS.Application
    .Interfaces.Repositories
{
    public interface
        IAnnouncementRepository
    {
        Task<IEnumerable<Announcement>>
            GetAllAsync();

        Task<Announcement>
            GetByIdAsync(int id);

        Task AddAsync(
            Announcement announcement);

        Task UpdateAsync(
            Announcement announcement);

        Task DeleteAsync(int id);
    }
}