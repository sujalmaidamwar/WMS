using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WMS.Application.DTOs.Auth;

namespace WMS.Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<string?> GenerateToken( LoginDto loginDto);

    }
}
