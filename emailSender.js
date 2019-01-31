const nodemailer = require('nodemailer');

emailSender = function(message, callback) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: "Crawler update",
    text: message
  };
  transporter.sendMail(mailOptions, callback);
};

module.exports = emailSender;