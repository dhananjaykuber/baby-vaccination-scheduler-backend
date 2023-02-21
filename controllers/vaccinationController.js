const Childern = require('../models/childrenModel');
const Vaccination = require('../models/vaccinationModel');

const getVaccinations = async (req, res) => {
  const { id } = req.params;

  try {
    const vaccinations = await Vaccination.find({ childernId: id });

    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status, childernId } = req.body;

  try {
    const vaccination = await Vaccination.findOneAndUpdate(
      { _id: id, childernId: childernId, hospitalId: req.hospital._id },
      {
        $set: {
          status: status,
        },
      }
    );

    res.status(200).json(vaccination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTodaysVaccination = async (req, res) => {
  const result = Date().toString().split(' ');

  const date = `${result[2]} ${result[1]} ${result[3]}`;

  try {
    const vaccinations = await Vaccination.find({
      date,
      hospitalId: req.hospital._id,
    });

    let childernIds = [];
    vaccinations.map((vaccination) => childernIds.push(vaccination.childernId));

    const childrens = await Childern.find({ _id: { $in: childernIds } });

    let todaysVaccination = [];
    for (let i = 0; i < childernIds.length; i++) {
      todaysVaccination.push({
        _id: childrens[i]._id,
        motherName: childrens[i].motherName,
        fatherName: childrens[i].fatherName,
        childernName: childrens[i].childernName,
        dateOfBirth: childrens[i].dateOfBirth,
        phone: childrens[i].phone,
        email: childrens[i].email,
        vaccinationId: vaccinations[i]._id,
        vaccineName: vaccinations[i].name,
        vaccinationDate: vaccinations[i].date,
        vaccinationStatus: vaccinations[i].status,
        mailed: vaccinations[i].mailed,
      });
    }

    res.status(200).json(todaysVaccination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateStatus, getVaccinations, getTodaysVaccination };

// const result = Date().toString().split(' ');

// const date = `${result[2]} ${result[1]} ${result[3]}`;

// try {
//   const vaccinations = await Vaccination.find({
//     date,
//     hospitalId: req.hospital._id,
//   });

//   res.status(200).json(vaccinations);
// } catch (error) {
//   res.status(400).json({ error: error.message });
// }
