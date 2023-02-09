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

    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { updateStatus, getVaccinations, getTodaysVaccination };
