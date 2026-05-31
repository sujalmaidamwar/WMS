using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs.Client;
using WMS.Application.Interfaces.Services;

namespace WMS.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }



        [HttpGet]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetAll()
        {
            var clients = await _clientService.GetAllAsync();

            return Ok(clients);
        }



        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> GetById(int id)
        {
            var client = await _clientService.GetByIdAsync(id);

            if (client == null)
            {
                return NotFound();
            }

            return Ok(client);
        }



        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> Add(ClientDto clientDto)
        {
            await _clientService.AddAsync(clientDto);

            return Ok(new
            {
                message = "Client Added Successfully"
            });
        }



        [HttpPut]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> Update(ClientDto clientDto)
        {
            await _clientService.UpdateAsync(clientDto);

            return Ok(new
            {
                message = "Client Updated Successfully"
            });
        }



        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _clientService.DeleteAsync(id);

            return Ok(new
            {
                message = "Client Deleted Successfully"
            });
        }
    }
}