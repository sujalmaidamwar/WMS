using WMS.Application.DTOs.Client;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Domain.Entities;
using WMS.Application.DTOs.AuditLog;

namespace WMS.Application.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        private readonly IAuditLogService _auditLogService;

        public ClientService(
            IClientRepository clientRepository,
            IAuditLogService auditLogService)
        {
            _clientRepository = clientRepository;
            _auditLogService = auditLogService;
        }



        public async Task<IEnumerable<ClientDto>> GetAllAsync()
        {
            var clients = await _clientRepository.GetAllAsync();

            return clients.Select(c =>
                new ClientDto
                {
                    ClientId = c.ClientId,
                    ClientName = c.ClientName,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    CompanyName = c.CompanyName,
                    Address = c.Address,
                    IsActive = c.IsActive
                });
        }



        public async Task<ClientDto?> GetByIdAsync(int id)
        {
            var client = await _clientRepository.GetByIdAsync(id);

            if (client == null)
            {
                return null;
            }

            return new ClientDto
            {
                ClientId = client.ClientId,
                ClientName = client.ClientName,
                Email = client.Email,
                PhoneNumber = client.PhoneNumber,
                CompanyName = client.CompanyName,
                Address = client.Address,
                IsActive = client.IsActive
            };
        }



        public async Task AddAsync(ClientDto clientDto)
        {
            var client = new Client
            {
                ClientName = clientDto.ClientName,
                Email = clientDto.Email,
                PhoneNumber = clientDto.PhoneNumber,
                CompanyName = clientDto.CompanyName,
                Address = clientDto.Address,
                IsActive = clientDto.IsActive
            };

            await _clientRepository.AddAsync(client);

            await _auditLogService.AddAsync(
                new AuditLogDto
                {
                    Action = "Add",
                    EntityName = "Client",
                    Description = $"Added client: {client.ClientName}",
                    PerformedBy = "Admin"
                }
            );
        }



        public async Task UpdateAsync(ClientDto clientDto)
        {
            var client =
                await _clientRepository.GetByIdAsync(
                    clientDto.ClientId
                );

            if (client == null)
            {
                return;
            }

            client.ClientName = clientDto.ClientName;
            client.Email = clientDto.Email;
            client.PhoneNumber = clientDto.PhoneNumber;
            client.CompanyName = clientDto.CompanyName;
            client.Address = clientDto.Address;
            client.IsActive = clientDto.IsActive;

            await _clientRepository.UpdateAsync(client);

            await _auditLogService.AddAsync(
                new AuditLogDto
                {
                    Action = "Add",
                    EntityName = "Client",
                    Description = $"Added client: {client.ClientName}",
                    PerformedBy = "Admin"
                }
            );
        }



        public async Task DeleteAsync(int id)
        {
            await _clientRepository.DeleteAsync(id);

            await _auditLogService.AddAsync(
                new AuditLogDto
                {
                    Action = "Delete",
                    EntityName = "Client",
                    Description = $"Deleted client with ID: {id}",
                    PerformedBy = "Admin"
                }
            );
        }
    }
}