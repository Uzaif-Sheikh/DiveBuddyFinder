using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;

namespace DiveBuddyFinder.Service {
    public class EmailService {
        private readonly IConfiguration _config;
        private readonly SmtpClient _client;

        public EmailService(IConfiguration configuration) {
            _config = configuration;
            _client = new SmtpClient(_config["EmailSettings:Server"], int.Parse(_config["EmailSettings:Port"]!))
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_config["EmailSettings:From"], _config["EmailSettings:Password"])
            };
        }

        public async Task SendVerificationCode(int code, string To) {

            var message = $"<h2>Welcome To DiveBuddyFinder!</h2><p>Your verification code is <strong>{code}</strong></p>";

            await _client.SendMailAsync(
                new MailMessage(from: _config["EmailSettings:From"]!, to: To, subject: _config["EmailSettings:SubjectVerificationCode"], body: message)
                {
                    IsBodyHtml = true
                }
            );
        }

        public async Task SendPasswordResetMail(string To) {
            // TODO: implement the pwd reset mail
        }
    }
}