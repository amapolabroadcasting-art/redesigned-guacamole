const nodemailer = require('nodemailer');

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    host: 'educentra.ai',
    port: 465,
    secure: true, // SSL required
    auth: {
      user: 'partnerwithus@educentra.ai',
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Educentra" <partnerwithus@educentra.ai>',
    to: 'someone@example.com',
    subject: 'Test email from code',
    text: 'Hello! This is a test email sent programmatically.',
    html: '<p>Hello! This is a <b>test email</b> sent programmatically.</p>',
  });

  console.log('Message sent:', info.messageId);
}

sendEmail().catch(console.error);
