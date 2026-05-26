using Microsoft.EntityFrameworkCore;

using Microsoft.Extensions.Configuration;
using WMS.Infrastructure.Data;


using Microsoft.IdentityModel.Tokens;

using System.IdentityModel.Tokens.Jwt;

using System.Security.Claims;

using System.Text;

using WMS.Application.DTOs;

using WMS.Application.Interfaces.Services;
using WMS.Application.DTOs.Auth;


namespace WMS.Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IConfiguration
        _configuration;

    private readonly ApplicationDbContext
        _context;

    public AuthService(
        IConfiguration configuration,
        ApplicationDbContext context)
    {
        _configuration = configuration;

        _context = context;
    }

    public async Task<string?>
    GenerateToken(
        LoginDto loginDto)
    {
        var user =
            await _context.Users
                .FirstOrDefaultAsync(u =>

                    u.Username ==
                        loginDto.Username
                );

        if (user == null)
        {
            return null;
        }

        bool isPasswordValid =

            BCrypt.Net.BCrypt
                .Verify(

                    loginDto.Password,

                    user.Password
                );

        if (!isPasswordValid)
        {
            return null;
        }

        var claims = new[]
        {
        new Claim(
            ClaimTypes.Name,
            user.Username),

        new Claim(
            ClaimTypes.Role,
            user.Role),

        new Claim(
            "EmployeeId",

            user.EmployeeId
                ?.ToString() ?? "")
    };

        var key =
            new SymmetricSecurityKey(

                Encoding.UTF8.GetBytes(
                    _configuration["Jwt:Key"]!)
            );

        var creds =
            new SigningCredentials(

                key,

                SecurityAlgorithms
                    .HmacSha256
            );

        var token =
            new JwtSecurityToken(

                issuer:
                    _configuration["Jwt:Issuer"],

                audience:
                    _configuration["Jwt:Audience"],

                claims: claims,

                expires:
                    DateTime.Now
                        .AddMinutes(

                            Convert.ToDouble(

                                _configuration[
                                    "Jwt:DurationInMinutes"]
                            )
                        ),

                signingCredentials:
                    creds
            );

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }


}