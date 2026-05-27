using WMS.Application
.DTOs.AuditLog;

namespace WMS.Application
.Interfaces.Services
{
    public interface
        IAuditLogService
    {
        Task<IEnumerable<AuditLogDto>>
            GetAllAsync();

        Task AddAsync(
            AuditLogDto auditLogDto
        );
    }
}