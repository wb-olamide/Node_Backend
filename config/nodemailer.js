const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    pass: "zlblokozswmwmrse",
    user: "bwaliu8@gmail.com",
  },
});

transporter.verify((err, success) => {
  if (success) {
    console.log("Nodemailer is ready to send emails");
  } else {
    console.log(err);
  }
});

module.exports = transporter;



// import nodemailer
// create transporter via nodemailer
// include host, port,secure and auth 