using Microsoft.AspNetCore.Mvc;
using WMS.Application.DTOs.Auth;
using WMS.Application.Interfaces.Services;

namespace WMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult>
    Login(LoginDto loginDto)
        {
            var token =
                await _authService
                    .GenerateToken(loginDto);

            if (token == null)
            {
                return Unauthorized(new
                {
                    success = false,
                    message =
                        "Invalid username or password"
                });
            }

            return Ok(new
            {
                success = true,
                token
            });
        }
    }
}