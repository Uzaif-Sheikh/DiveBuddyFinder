using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace DiveBuddyFinder.Service {

    public class JwtService {

        IConfiguration _config;

        public JwtService(IConfiguration configuration) {
            _config = configuration;
        }

        public string GenerateAccessToken(Guid Id, string Email, string Role) {

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var Claims = new List<Claim>() {
                new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
                new Claim(ClaimTypes.Email, Email),
                new Claim(ClaimTypes.Role, Role)
            };


            var TokenDescription = new SecurityTokenDescriptor() {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.UtcNow.AddHours(int.Parse(_config["Jwt:AccessTokenTimeInHours"]!)),
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Audience"],
                SigningCredentials = credentials
            };

            var TokenHandler = new JwtSecurityTokenHandler();
            var Token = TokenHandler.CreateToken(TokenDescription);
            
            return TokenHandler.WriteToken(Token);
        }

        public string GenerateRefreshToken() {
            
            var RandomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetNonZeroBytes(RandomNumber);

            return Convert.ToBase64String(RandomNumber);
        }

    }

}