const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  try {
    // For development, use a test account
    const testAccount = await nodemailer.createTestAccount();
    
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER || testAccount.user,
        pass: process.env.EMAIL_PASS || testAccount.pass
      }
    });
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Musicify" <noreply@musicify.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    // Log URL for development environments when using ethereal
    if (process.env.NODE_ENV !== 'production') {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

module.exports = sendEmail;