using Microsoft.AspNetCore.Authorization;

using Microsoft.AspNetCore.Mvc;

using WMS.Application
.DTOs.AuditLog;

using WMS.Application
.Interfaces.Services;

namespace WMS.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    [Authorize]
    public class AuditLogController
        : ControllerBase
    {
        private readonly
            IAuditLogService
                _auditLogService;

        public AuditLogController(
            IAuditLogService
                auditLogService
        )
        {
            _auditLogService =
                auditLogService;
        }

        [HttpGet]

        [Authorize(Roles = "Admin")]
        public async Task<IActionResult>
            GetAll()
        {
            var logs =
                await _auditLogService
                    .GetAllAsync();

            return Ok(logs);
        }

        [HttpPost]
        public async Task<IActionResult>
            Add(
                AuditLogDto auditLogDto
            )
        {
            await _auditLogService
                .AddAsync(auditLogDto);

            return Ok(new
            {
                message =
                    "Audit Log Added Successfully"
            });
        }
    }
}