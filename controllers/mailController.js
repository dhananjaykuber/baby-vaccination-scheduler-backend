const nodemailer = require('nodemailer');
const Vaccination = require('../models/vaccinationModel');
const Childern = require('../models/childrenModel');

const sendEmail = async (req, res) => {
  var result = new Date();
  result.setDate(result.getDate());
  result = result.toString().split(' ');

  const date = `${result[2]} ${result[1]} ${result[3]}`;

  try {
    const vaccinations = await Vaccination.find({
      date,
      mailed: false,
    });

    let childrensIds = [];
    vaccinations.map((vaccination) => {
      childrensIds.push(vaccination.childernId);
    });

    let emails = [];

    for (let i = 0; i < childrensIds.length; i++) {
      const children = await Childern.findOne({ _id: childrensIds[i] });
      emails.push(children.email);
    }

    // node mailer
    let transporter = nodemailer.createTestAccount({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: 'Dhananjay Kuber <dnkuber2002@gmail.com>', // sender address
      to: 'dnkuber2002@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    // for (let i = 0; i < emails.length; i++) {
    //   let info = await transporter.sendMail({});

    //   console.log('Message sent: %s', info.messageId);
    //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    //   // Preview only available when sending through an Ethereal account
    //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendEmail };
