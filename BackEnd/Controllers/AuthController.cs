using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using API_VSCode.Models;

namespace API_VSCode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login(UserLoginDto dto)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == dto.Email);
            if (user == null) return Unauthorized();

            bool passwordValid = false;
            // DEBUG: log password value and length (remove in production)
            Console.WriteLine($"DEBUG: fetched password='{user.Password}' (len={user.Password?.Length})");
            if (!string.IsNullOrEmpty(user.Password) && user.Password.Length == 60 &&
                (user.Password.StartsWith("$2a$") || user.Password.StartsWith("$2b$") || user.Password.StartsWith("$2y$")))
            {
                passwordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.Password);
            }
            else
            {
                // legacy/plaintext password stored — verify directly and re-hash on success
                if (dto.Password == user.Password)
                {
                    passwordValid = true;
                    user.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);
                    _context.SaveChanges();
                }
            }

            if (!passwordValid) return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? string.Empty);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiresMinutes"] ?? "60")),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new AuthResponseDto { Token = tokenString, Expires = tokenDescriptor.Expires?.ToString("o") });
        }
    }
}
