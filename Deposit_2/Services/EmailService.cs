using System.Threading.Tasks;
using Deposit_2.Resources;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Identity.UI.Services;
using MimeKit;
using Deposit_2.Utils;

namespace Deposit_2.Services
{
    public class EmailService : IEmailSender
    {
        private const string htmlTextForm = "html";
        private readonly ApplicationConfiguration _config;

        public EmailService(ApplicationConfiguration config)
        {
            _config = config;
        }

        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(EmailMessages.FromMailBoxAddressName, _config.Email));
            mimeMessage.To.Add(new MailboxAddress(email, email));
            mimeMessage.Subject = subject;
            mimeMessage.Body = new TextPart(htmlTextForm)
            {
                Text = htmlMessage
            };

            using (var client = new SmtpClient())
            {
                client.Connect(_config.Host, _config.PortNumber, _config.UseSsl);
                client.Authenticate(_config.Email, _config.Password);
                await client.SendAsync(mimeMessage);
                await client.DisconnectAsync(true);
            }
        }
    }
}
