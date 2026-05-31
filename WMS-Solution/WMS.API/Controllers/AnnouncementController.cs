using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs.Announcement;
using WMS.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;

namespace WMS.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AnnouncementController : ControllerBase
    {
        private readonly IAnnouncementService _service;

        public AnnouncementController(IAnnouncementService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var announcements = await _service.GetAllAsync();

            return Ok(announcements);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var announcement = await _service.GetByIdAsync(id);

            if (announcement == null)
            {
                return NotFound();
            }

            return Ok(announcement);
        }



        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Add(AnnouncementDto dto)
        {
            await _service.AddAsync(dto);

            return Ok(new
            {
                message = "Announcement Added"
            });
        }



        [HttpPut]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(AnnouncementDto dto)
        {
            await _service.UpdateAsync(dto);

            return Ok(new
            {
                message = "Announcement Updated"
            });
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);

            return Ok(new
            {
                message = "Announcement Deleted"
            });
        }
    }
}