import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, text }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'serviceofshoppingmart@gmail.com', // Your Gmail address
        pass: 'zpvgbuezzpnjaydw', // Your Gmail App Password
      },
    });

    const mailOptions = {
      from: 'serviceofshoppingmart@gmail.com',
      to, // Recipient email
      subject, // Email subject
      text, // Email body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ', info.response);
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

export default sendEmail;
