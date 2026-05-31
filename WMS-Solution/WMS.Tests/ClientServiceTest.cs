using FluentAssertions;
using Moq;
using WMS.Application.DTOs.Client;
using WMS.Application.Interfaces.Repositories;
using WMS.Application.Interfaces.Services;
using WMS.Application.Services;
using Xunit;

namespace WMS.Tests
{
    public class ClientServiceTests
    {
        private readonly Mock<IClientRepository> _clientRepositoryMock;
        private readonly Mock<IAuditLogService> _auditLogServiceMock;
        private readonly ClientService _clientService;

        public ClientServiceTests()
        {
            _clientRepositoryMock =
                new Mock<IClientRepository>();

            _auditLogServiceMock =
                new Mock<IAuditLogService>();

            _clientService =
                new ClientService(
                    _clientRepositoryMock.Object,
                    _auditLogServiceMock.Object
                );
        }

        [Fact]
        public async Task AddClient_ShouldAddClient()
        {
            // Arrange
            var clientDto = new ClientDto
            {
                ClientName = "Infosys",
                CompanyName = "Infosys Ltd",
                Email = "info@test.com",
                PhoneNumber = "9999999999",
                Address = "Nagpur"
            };

            // Act
            await _clientService.AddAsync(clientDto);

            // Assert
            _clientRepositoryMock.Verify(
                repo => repo.AddAsync(
                    It.IsAny<WMS.Domain.Entities.Client>()
                ),
                Times.Once
            );
        }
    }
}