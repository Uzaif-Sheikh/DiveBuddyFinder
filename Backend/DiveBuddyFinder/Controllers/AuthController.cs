using System.Security.Cryptography;
using System.Text;
using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.Auth;
using DiveBuddyFinder.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DiveBuddyFinder.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly ApplicationDbContext _DbContext;
        private readonly JwtService _JwtSerivce;
        private readonly IConfiguration _Config;

        public AuthController(ApplicationDbContext applicationDbContext, JwtService jwtService, IConfiguration configuration) {
            _DbContext = applicationDbContext;
            _JwtSerivce = jwtService;
            _Config = configuration;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<AuthRespondDto>> Register([FromBody] AuthRequestDto RegisterDto) {

            var GetUser = await _DbContext.Users.FirstOrDefaultAsync(u => u.Email == RegisterDto.Email);

            if(GetUser != null) {
                return BadRequest(new {
                    Error = "User with the same email already exist"
                });
            }

            string password = HashTheString(RegisterDto.Password);

            User User = new User() {
                Email = RegisterDto.Email,
                Password = password,
                Role = "User"
            };

            _DbContext.Users.Add(User);
            await _DbContext.SaveChangesAsync();

            var AccessToken = _JwtSerivce.GenerateAccessToken(User.Id, User.Email, User.Role);
            var RefreshToken = await GetRefreshToken(User.Id);

            return Ok(new AuthRespondDto() {
                UserId = User.Id,
                AccessToken = AccessToken,
                RefreshToken = RefreshToken
            });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthRespondDto>> Login([FromBody] AuthRequestDto LoginDto) {

            string password = HashTheString(LoginDto.Password);

            var User = await _DbContext.Users.FirstOrDefaultAsync(u => u.Email == LoginDto.Email && u.Password == password);

            if(User is null) {
                return BadRequest(new {
                    Error = "User was not found"
                });
            }

            var AccessToken = _JwtSerivce.GenerateAccessToken(User!.Id, LoginDto.Email, "User");
            var RefreshToken = await GetRefreshToken(User!.Id);
            
            return Ok(new AuthRespondDto() {
                UserId = Guid.NewGuid(),
                AccessToken = AccessToken,
                RefreshToken = RefreshToken
            });
        }

        private string HashTheString(string Password) {
            
            SHA256 sHA256 = SHA256.Create();
            byte[] hash = sHA256.ComputeHash(Encoding.UTF8.GetBytes(Password));
            StringBuilder stringBuilder = new StringBuilder();
            foreach(var b in hash) {
                stringBuilder.Append(b.ToString("x2"));
            }

            return stringBuilder.ToString();

        }

        private async Task<string> GetRefreshToken(Guid Id) {

            var RefreshTokenEntity = await _DbContext.RefreshTokens.FirstOrDefaultAsync(r => r.UserId == Id);

            if(RefreshTokenEntity != null) {
                _DbContext.RefreshTokens.Remove(RefreshTokenEntity);
            }

            var RefreshToken = _JwtSerivce.GenerateRefreshToken();

            RefreshToken refreshToken = new RefreshToken() {
                Token = RefreshToken,
                UserId = Id,
                ExpiresOnUtc = DateTime.UtcNow.AddDays(int.Parse(_Config["Jwt:RefreshTokenTimeInDays"]!))
            };

            _DbContext.RefreshTokens.Add(refreshToken);
            await _DbContext.SaveChangesAsync();

            return RefreshToken;
        }
    }
}