const Childern = require('../models/childrenModel');
const Vaccination = require('../models/vaccinationModel');
const calculateDate = require('../utils/calculateDate');

const childrenRegister = async (req, res) => {
  const {
    motherName,
    fatherName,
    childernName,
    dateOfBirth,
    weight,
    gender,
    phone,
    email,
  } = req.body;

  try {
    const childern = await Childern.create({
      motherName,
      fatherName,
      childernName,
      dateOfBirth,
      weight,
      gender,
      phone,
      email,
      hospitalId: req.hospital._id,
    });

    const dob = dateOfBirth.split('-');

    for (let i = 0; i < 4; i++) {
      const vacination = await Vaccination.create({
        name: `Vaccine${i}`,
        date: calculateDate(`${dob[1]} ${dob[2]} ${dob[0]}`, i),
        duration: '3 Months',
        status: false,
        childernId: childern._id,
        hospitalId: req.hospital._id,
        mailed: false,
      });
    }

    res.status(200).json(childern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChildrens = async (req, res) => {
  try {
    const childerns = await Childern.find({
      hospitalId: req.hospital._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(childerns);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChildren = async (req, res) => {
  const { id } = req.params;

  try {
    const childern = await Childern.findOne({
      hospitalId: req.hospital._id,
      _id: id,
    });

    res.status(200).json(childern);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteChildren = async (req, res) => {
  const { id } = req.params;

  try {
    const vaccination = await Vaccination.deleteMany({ childernId: id });
    const children = await Childern.deleteOne({
      _id: id,
      hospitalId: req.hospital._id,
    });

    res.status(200).json({ message: 'Children deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateChildren = async (req, res) => {
  const {
    motherName,
    fatherName,
    childernName,
    dateOfBirth,
    weight,
    gender,
    phone,
    email,
  } = req.body;
  const { id } = req.params;

  try {
    const children = await Childern.updateOne(
      { _id: id, hospitalId: req.hospital._id },
      {
        $set: {
          motherName,
          fatherName,
          childernName,
          dateOfBirth,
          weight,
          gender,
          phone,
          email,
        },
      }
    );

    res
      .status(200)
      .json({ message: 'Children information updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  childrenRegister,
  getChildrens,
  getChildren,
  deleteChildren,
  updateChildren,
};
