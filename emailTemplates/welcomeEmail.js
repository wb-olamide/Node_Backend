const transporter = require("../config/nodemailer");

const sendWelcomeEmail = (name, email, verificationToken) => {
  transporter.sendMail({
    subject: "Welcome to WBEE NODE",
    from: "WBEE Backend<bwaliu8@gmail.com>",
    to: email,
    sender: "bwaliu8@gmail.com",
    text: `Hello ${name}, welcome to WBEE backend, Follow this link to verifiy your account http://localhost:4000/api/auth/verify/${verificationToken}`,
  });
};

module.exports = sendWelcomeEmail;
