using WMS.Application.DTOs.Client;

namespace WMS.Application.Interfaces.Services
{
    public interface IClientService
    {
        Task<IEnumerable<ClientDto>> GetAllAsync();

        Task<ClientDto?> GetByIdAsync(int id);

        Task AddAsync(ClientDto clientDto);

        Task UpdateAsync(ClientDto clientDto);

        Task DeleteAsync(int id);
    }
}