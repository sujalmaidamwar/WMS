using WMS.Application.DTOs.Announcement;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Domain.Entities;

namespace WMS.Application.Services
{
    public class AnnouncementService : IAnnouncementService
    {
        private readonly IAnnouncementRepository _repository;

        public AnnouncementService(IAnnouncementRepository repository)
        {
            _repository = repository;
        }


        public async Task<IEnumerable<AnnouncementDto>> GetAllAsync()
        {
            var announcements = await _repository.GetAllAsync();

            return announcements.Select(a =>
                new AnnouncementDto
                {
                    AnnouncementId = a.AnnouncementId,
                    Title = a.Title,
                    Message = a.Message,
                    CreatedBy = a.CreatedBy,
                    CreatedOn = a.CreatedOn,
                    IsActive = a.IsActive
                });
        }



        public async Task<AnnouncementDto> GetByIdAsync(int id)
        {
            var a = await _repository.GetByIdAsync(id);

            if (a == null)
                return null;

            return new AnnouncementDto
            {
                AnnouncementId = a.AnnouncementId,
                Title = a.Title,
                Message = a.Message,
                CreatedBy = a.CreatedBy,
                CreatedOn = a.CreatedOn,
                IsActive = a.IsActive
            };
        }



        public async Task AddAsync(AnnouncementDto dto)
        {
            var announcement = new Announcement
            {
                Title = dto.Title,
                Message = dto.Message,
                CreatedBy = dto.CreatedBy,
                CreatedOn = DateTime.Now,
                IsActive = dto.IsActive
            };

            await _repository.AddAsync(announcement);
        }



        public async Task UpdateAsync(AnnouncementDto dto)
        {
            var announcement =
                await _repository.GetByIdAsync(dto.AnnouncementId);

            if (announcement == null)
                return;

            announcement.Title = dto.Title;
            announcement.Message = dto.Message;
            announcement.IsActive = dto.IsActive;

            await _repository.UpdateAsync(announcement);
        }



        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}