using System;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

class Program
{
    static int Main()
    {
        try
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Educentra", "partnerwithus@educentra.ai"));
            message.To.Add(new MailboxAddress("Test Recipient", "someone@example.com"));
            message.Subject = "Test email from C# via GitHub Actions";

            message.Body = new TextPart("html")
            {
                Text = "<p>Hello from <b>C#</b> running in GitHub Actions.</p>"
            };

            var smtpPassword = Environment.GetEnvironmentVariable("SMTP_PASSWORD");
            if (string.IsNullOrWhiteSpace(smtpPassword))
            {
                Console.Error.WriteLine("SMTP_PASSWORD environment variable is not set.");
                return 1;
            }

            using var client = new SmtpClient();

            // If you use your own server (may still time out from Actions):
            client.Connect("educentra.ai", 465, SecureSocketOptions.SslOnConnect);
            client.Authenticate("partnerwithus@educentra.ai", smtpPassword);

            // If you switch to a free SMTP like Brevo, it would look like:
            // client.Connect("smtp-relay.brevo.com", 587, SecureSocketOptions.StartTls);
            // client.Authenticate("your-brevo-login-email", smtpPassword);

            client.Send(message);
            client.Disconnect(true);

            Console.WriteLine("Email sent.");
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("Error sending email: " + ex);
            return 1;
        }
    }
}
