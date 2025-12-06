using System;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

class Program
{
    static void Main()
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Educentra", "partnerwithus@educentra.ai"));
        message.To.Add(new MailboxAddress("Recipient Name", "someone@example.com"));
        message.Subject = "Test email from Educentra";

        message.Body = new TextPart("plain")
        {
            Text = "Hello! This is a test email sent programmatically."
        };

        using (var client = new SmtpClient())
        {
            // connect
            client.Connect("mail.educentra.ai", 587, SecureSocketOptions.StartTls);

            // authenticate
            client.Authenticate("partnerwithus@educentra.ai", Environment.GetEnvironmentVariable("SMTP_PASSWORD"));

            // send
            client.Send(message);
            client.Disconnect(true);
        }

        Console.WriteLine("Email sent.");
    }
}
