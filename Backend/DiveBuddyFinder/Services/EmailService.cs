using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;

namespace DiveBuddyFinder.Service
{
    public class EmailService
    {
        private readonly IConfiguration _config;
        private readonly SmtpClient _client;

        public EmailService(IConfiguration configuration)
        {
            _config = configuration;
            _client = new SmtpClient(_config["EmailSettings:Server"], int.Parse(_config["EmailSettings:Port"]!))
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_config["EmailSettings:From"], _config["EmailSettings:Password"])
            };
        }

        public async Task SendVerificationCode(int code, string To)
        {

            var message = $"<h2>Welcome To DiveBuddyFinder!</h2><p>Your verification code is <strong>{code}</strong></p>";

            await _client.SendMailAsync(
                new MailMessage(from: _config["EmailSettings:From"]!, to: To, subject: _config["EmailSettings:SubjectVerificationCode"], body: message)
                {
                    IsBodyHtml = true
                }
            );
        }

        public async Task SendPasswordResetMail(string To, Guid Token)
        {

            var resetLink = $"http://localhost:3000/reset-password/{Token}";

            var message = $@"<h2>Hi {To}!</h2><p>You recently requested to reset your password. Click the button below to choose a new one. This link will expire in 15 minutes.</p><p style=""text-align: center; margin: 30px 0;"">
                  <a href=""{resetLink}"" target=""_blank"" style=""background-color: #0B6BCB; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px;"">Reset Password</a>
                </p>";

            await _client.SendMailAsync(
                new MailMessage(from: _config["EmailSettings:From"]!, to: To, subject: _config["EmailSettings:SubjectResetPassword"], body: message)
                {
                    IsBodyHtml = true
                }
            );
        }
    }
}