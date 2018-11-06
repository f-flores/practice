// ==========================================================
//
// mailController.js
//
// ==========================================================

require("dotenv").config();

const nodemailer = require('nodemailer');
const SENDER_NAME = "Staff at Scheduling App";
const SMTP_SERVER = process.env.SMTP_SERVER;
const EMAIL_SERVICE = process.env.EMAIL_SERVICE;
const NMAILER_USER = process.env.REACT_APP_NMAILER_EMAIL;
const NMAILER_PASSWORD = process.env.REACT_APP_NMAILER_PASSWORD;

// Defining database authentication methods for Franchise model
module.exports = {
  sendMail: function (req, res) {
    const {subscribeEmail, subscribeName, msg} = req.body;
    console.log(`mailController in sendMail() req.body`, req.body);
    console.log(`SMTP_SERVER: ${SMTP_SERVER},
    USER: ${NMAILER_USER},
    PW: ${NMAILER_PASSWORD},
    to_email: ${subscribeEmail},
    sender_name: ${SENDER_NAME}
    `);
    // settings for outlook
    let transporter = nodemailer.createTransport({
        host: SMTP_SERVER,
        port: 587,
        secureConnection: false, // true for 465, false for other ports
        auth: {
            user: NMAILER_USER, // generated ethereal user
            pass: NMAILER_PASSWORD // generated ethereal password
        },
        tls: {
          rejectUnauthorized: false,
          ciphers:'SSLv3'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"${SENDER_NAME}"<${NMAILER_USER}>`, // sender address
        to: subscribeEmail, // receiver address
        subject: 'Subscription Confirmation ✔', // Subject line
        text: `${msg}`, // plain text body
        html: `${msg}` // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        console.log(`mailOptions: `, mailOptions);
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        res.json({confirmMsg: "Subscription email sent."});
    }); 
    // res.json({confirmMsg: "Subscription email sent"});
  },
};