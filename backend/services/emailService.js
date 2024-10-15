const nodemailer = require('nodemailer');

const sendWelcomeEmail = async (customer) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Email content and details
    const mailOptions = {
      from: '"Ride Eve"', // Sender address
      to: customer.email, // Receiver's email
      subject: 'Welcome to Our Service!',
      text: `Hello ${customer.firstName} ${customer.lastName},\n\nThank you for registering with us!\n\nRegards,\nRideeve`,
      html: `<p>Hello <strong>${customer.firstName} ${customer.lastName}</strong>,</p><p>Thank you for registering with us!</p><p>Regards,<br>Rideeve</p>`, // You can use HTML for a rich email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendWelcomeEmail };
