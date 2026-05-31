using WMS.Application.DTOs.Announcement;

namespace WMS.Application.Interfaces.Services
{
    public interface IAnnouncementService
    {
        Task<IEnumerable <AnnouncementDto>> GetAllAsync();

        Task<AnnouncementDto> GetByIdAsync(int id);

        Task AddAsync( AnnouncementDto dto);

        Task UpdateAsync( AnnouncementDto dto);

        Task DeleteAsync(int id);
    }
}