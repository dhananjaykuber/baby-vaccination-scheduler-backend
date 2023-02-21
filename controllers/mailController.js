const nodemailer = require('nodemailer');
const Vaccination = require('../models/vaccinationModel');
const Childern = require('../models/childrenModel');

const sendEmail = async (req, res) => {
  const {
    motherName,
    fatherName,
    childernName,
    email,
    vaccineName,
    vaccinationDate,
    hospitalName,
    vaccinationId,
  } = req.body;

  try {
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
      to: email,
      subject: 'Vaccination',
      text: `Hello parent name: ${motherName}, ${fatherName}. Please complete ${vaccineName} vaccination of your children ${childernName} today only at ${hospitalName} on ${vaccinationDate}. \n\n Thanks!`,
    });

    const updateVaccination = await Vaccination.updateOne(
      {
        _id: vaccinationId,
        date: vaccinationDate,
      },
      {
        $set: {
          mailed: true,
        },
      }
    );

    console.log(updateVaccination);
    res.status(200).json(info);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sendEmail };
