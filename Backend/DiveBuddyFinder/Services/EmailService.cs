using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;

namespace DiveBuddyFinder.Service {
    public class EmailService {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration configuration) {
            _config = configuration;
        }

        public async Task SendVerificationCode(string To) {

            var code = RandomNumberGenerator.GetInt32(100000, 999999);

            var message = $"<h2>Welcome To DiveBuddyFinder!</h2><p>Your verification code is <strong>{code}</strong></p>";

            var client = new SmtpClient(_config["EmailSettings:Server"], int.Parse(_config["EmailSettings:Port"]!))
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_config["EmailSettings:From"], _config["EmailSettings:Password"])
            };

            await client.SendMailAsync(
                new MailMessage(from: _config["EmailSettings:From"]!, to: To, subject: _config["EmailSettings:Subject"], body: message)
                {
                    IsBodyHtml = true
                }
            );
        }
    }
}