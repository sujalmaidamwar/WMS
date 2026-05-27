using WMS.Application
.DTOs.AuditLog;

using WMS.Application
.Interfaces.Repositories;

using WMS.Application
.Interfaces.Services;

using WMS.Domain.Entities;

namespace WMS.Application
.Services
{
    public class AuditLogService
        : IAuditLogService
    {
        private readonly
            IAuditLogRepository
                _auditLogRepository;

        public AuditLogService(
            IAuditLogRepository
                auditLogRepository
        )
        {
            _auditLogRepository =
                auditLogRepository;
        }

        public async Task<
            IEnumerable<AuditLogDto>
        >
        GetAllAsync()
        {
            var logs =
                await _auditLogRepository
                    .GetAllAsync();

            return logs.Select(log =>
                new AuditLogDto
                {
                    AuditLogId =
                        log.AuditLogId,

                    Action =
                        log.Action,

                    EntityName =
                        log.EntityName,

                    Description =
                        log.Description,

                    PerformedBy =
                        log.PerformedBy,

                    PerformedOn =
                        log.PerformedOn
                });
        }

        public async Task AddAsync(
            AuditLogDto auditLogDto
        )
        {
            var auditLog =
                new AuditLog
                {
                    Action =
                        auditLogDto.Action,

                    EntityName =
                        auditLogDto.EntityName,

                    Description =
                        auditLogDto.Description,

                    PerformedBy =
                        auditLogDto.PerformedBy,

                    PerformedOn =
                        DateTime.Now
                };

            Console.WriteLine("Audit Log Triggered");

            await _auditLogRepository
                .AddAsync(auditLog);

        }
    }
}