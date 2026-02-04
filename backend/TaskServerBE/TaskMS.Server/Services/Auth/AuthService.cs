using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskMS.Server.Data;
using TaskMS.Server.DTOs;
using TaskMS.Server.Models;

namespace TaskMS.Server.Services.Auth
{
    public class AuthService
    {
        private readonly TaskMSContext _ctx;
        private readonly JwtTokenGenerator _jwt;

        public AuthService(TaskMSContext ctx, JwtTokenGenerator jwt)
        {
            _ctx = ctx;
            _jwt = jwt;
        }

        public async Task Register(AuthDto dto)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            if (await _ctx.Users.AnyAsync(x => x.Username == dto.Username))
                throw new BadHttpRequestException("Username already exists");

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
        }

        public async Task<string> Login(AuthDto dto)
        {
            var user = await _ctx.Users
                .FirstOrDefaultAsync(x => x.Username == dto.Username);

            if (user == null ||
                !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                throw new Exception("Invalid username or password");

            return _jwt.GenerateToken(user);
        }
    }

}
