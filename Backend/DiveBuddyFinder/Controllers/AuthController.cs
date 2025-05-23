using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using DiveBuddyFinder.Data;
using DiveBuddyFinder.Models;
using DiveBuddyFinder.Models.Dtos.Auth;
using DiveBuddyFinder.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YamlDotNet.Core.Tokens;

namespace DiveBuddyFinder.Controllers {

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase {

        private readonly ApplicationDbContext _DbContext;
        private readonly JwtService _JwtSerivce;
        private readonly IConfiguration _Config;
        private readonly EmailService _EmailService;

        public AuthController(ApplicationDbContext applicationDbContext
                            , JwtService jwtService
                            , IConfiguration configuration
                            , EmailService emailService) {
            _DbContext = applicationDbContext;
            _JwtSerivce = jwtService;
            _Config = configuration;
            _EmailService = emailService;
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
        public async Task<ActionResult<LoginRespondDto>> Login([FromBody] AuthRequestDto LoginDto) {

            string password = HashTheString(LoginDto.Password);

            var User = await _DbContext.Users.FirstOrDefaultAsync(u => u.Email == LoginDto.Email && u.Password == password);

            if(User is null) {
                return BadRequest(new {
                    Error = "User was not found"
                });
            }

            var AccessToken = _JwtSerivce.GenerateAccessToken(User!.Id, LoginDto.Email, "User");
            var RefreshToken = await GetRefreshToken(User!.Id);
            
            return Ok(new LoginRespondDto() {
                UserId = User.Id,
                AccessToken = AccessToken,
                RefreshToken = RefreshToken,
                isVerified = User.isVerified
            });
        }

        [HttpPost("Logout")]
        [Authorize]
        public async Task<IActionResult> Logout() {

            var user = HttpContext.User;

            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(userId is null) {
                return BadRequest(new {
                    Error = "Access Token is not valid"
                });
            }

            var RefreshToken = await _DbContext.RefreshTokens.FirstOrDefaultAsync(r => r.UserId == Guid.Parse(userId!));

            if(RefreshToken is null) {
                return BadRequest(new {
                    Error = "Logout Failed"
                });
            }

            _DbContext.RefreshTokens.Remove(RefreshToken);
            await _DbContext.SaveChangesAsync();

            return Ok();

        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult<RefreshTokenRespond>> RefreshToken([FromBody] RefreshTokenRequest refreshTokenRequest) {

            var RefreshToken = await _DbContext.RefreshTokens
                                                .Include(r => r.User)
                                                .FirstOrDefaultAsync(r => r.Token == refreshTokenRequest.Token);

            if(RefreshToken is null || RefreshToken.ExpiresOnUtc < DateTime.UtcNow) {
                return BadRequest(new {
                    Error = "Token is Invalid."
                });
            }

            var newRefreshToken = _JwtSerivce.GenerateRefreshToken();
            var AccessToken = _JwtSerivce.GenerateAccessToken(RefreshToken.User.Id,
                                                              RefreshToken.User.Email,
                                                              RefreshToken.User.Role);

            RefreshToken.Token = newRefreshToken;
            RefreshToken.ExpiresOnUtc = DateTime.UtcNow.AddDays(int.Parse(_Config["Jwt:RefreshTokenTimeInDays"]!));

            await _DbContext.SaveChangesAsync();

            return Ok(new RefreshTokenRespond() {
                AccessToken = AccessToken,
                RefreshToken = newRefreshToken
            });

        }

        [HttpPost("GetVerificationCode")]
        [Authorize]
        public async Task<IActionResult> GetVerificationCode([FromBody] string email) {
            // TODO: need to refactor the code to put the logic in email service
            
            var user = await _DbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if(user == null) {
                return BadRequest(new {
                    Error = "Email is not registered"
                });
            }

            if(user.isVerified == true) {
                return BadRequest(new {
                    Error = "Email is already verified"
                });
            }

            var code = GenerateVerificationCode();

            await DeleteAllVerificationCodes(user.Id);

            var VerificationCode = new UserVerification() {
                VerificationCode = code,
                ExpireTime = DateTime.Now.AddMinutes(15),
                UserId = user.Id
            };

            _DbContext.UserVerifications.Add(VerificationCode);
            await _DbContext.SaveChangesAsync();

            await _EmailService.SendVerificationCode(code, email);

            return Ok();
        }

        [HttpPost("VerifyTheUser/{code}")]
        [Authorize]
        public async Task<IActionResult> VerifyTheUser([FromRoute] int code) {
            // TODO: need to refactor the code to put the logic in email service

            var userClaim = HttpContext.User;
            var userId = userClaim.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if(userId?.Length == 0) {
                return BadRequest(new {
                    Error = "Invalid user request"
                });
            }

            var user = await _DbContext.Users.FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId));

            if(user == null) {
                return BadRequest(new {
                    Error = "Invalid token"
                });
            }

            if(user.isVerified) {
                return BadRequest(new {
                    Error = "User is already verified"
                });
            }

            var codeRow = await _DbContext.UserVerifications.FirstOrDefaultAsync(uv => uv.UserId == user.Id);

            if(codeRow?.ExpireTime < DateTime.Now) {
                return BadRequest(new {
                    Error = "Verification code has expired"
                });
            }

            if(code != codeRow?.VerificationCode) {
                return BadRequest(new {
                    Error = "Invalid verification code"
                });
            }

            await DeleteAllVerificationCodes(user.Id);

            user.isVerified = true;
            await _DbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPost("ForgotPassword/{email}")]
        public async Task<IActionResult> ForgotPassword([FromRoute] string email) {

            var user = await _DbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if(user == null) {
                return BadRequest(new {
                    Error = "Email is not registered"
                });
            }

            await DeleteAllResetPwdToken(user.Id);

            var pwdReset = new ResetPwd(){
                ExpireTime = DateTime.Now.AddMinutes(15),
                UserId = user.Id
            };

            _DbContext.ResetPwds.Add(pwdReset);
            await _DbContext.SaveChangesAsync();

            await _EmailService.SendPasswordResetMail(email, pwdReset.Id);

            return Ok();
        }

        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPwdRequestDto resetPwdRequestDto) {

            var resetPwd = await _DbContext.ResetPwds.Include(r => r.User).FirstOrDefaultAsync(r => r.Id == resetPwdRequestDto.Token);

            if(resetPwd == null) {
                return BadRequest(new {
                    Error = "Invalid Token"
                });
            }

            if(resetPwd.used || DateTime.Now > resetPwd.ExpireTime) {
                return BadRequest(new {
                    Error = "Token has been expired"
                });
            }

            var user = resetPwd.User;

            if(user.Password == HashTheString(resetPwdRequestDto.Password)) {
                return BadRequest(new {
                    Error = "New password can not be the same as the old password"
                });
            }

            user.Password = HashTheString(resetPwdRequestDto.Password);
            
            await DeleteAllResetPwdToken(user.Id);
            await _DbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("RevokeRefreshToken/{UserId}")]
        public async Task<IActionResult> RevokeRefreshToken(Guid UserId) {

            Guid id;
            Guid? userId = Guid.TryParse(
                HttpContext.User
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value,out id) ? id : null;

            if(userId is null) {
                return BadRequest(new {
                    Error = "UserId is not valid"
                });
            }

            await _DbContext.RefreshTokens
            .Where(r => r.UserId == userId)
            .ExecuteDeleteAsync();

            return Ok();
        }

        private async Task DeleteAllVerificationCodes(Guid UserId) {
            var DeleteCodeList = await _DbContext.UserVerifications.Where(uv => uv.UserId == UserId).ToListAsync();

            if(DeleteCodeList.Any()) {
                _DbContext.UserVerifications.RemoveRange(DeleteCodeList);
            }
        }

        private async Task DeleteAllResetPwdToken(Guid UserId) {
            var deleteResetPwdTokenList = await _DbContext.ResetPwds.Where(r => r.UserId == UserId).ToListAsync();

            if(deleteResetPwdTokenList.Any()) {
                _DbContext.ResetPwds.RemoveRange(deleteResetPwdTokenList);
            }
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

        private int GenerateVerificationCode() {
            return RandomNumberGenerator.GetInt32(100000, 999999);
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