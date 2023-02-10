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

    if (childrensIds.length < 1) {
      return res.status(200).json({ message: 'No childrens' });
    }

    let emails = [];

    for (let i = 0; i < childrensIds.length; i++) {
      const children = await Childern.findOne({ _id: childrensIds[i] });
      emails.push(children.email);
    }

    let emailString = '';
    for (let i = 0; i < emails.length - 1; i++) {
      emailString += `${emails[i]}, `;
    }
    emailString += `${emails[emails.length - 1]}`;

    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    let info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: emailString,
      subject: 'Vaccination',
      text: 'Please complete vaccination of your children. \n\n Thanks!',
    });

    const updateVaccinations = await Vaccination.updateMany(
      {
        date,
        mailed: false,
      },
      {
        $set: {
          mailed: true,
        },
      }
    );

    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendEmail };
