const Hospital = require('../models/hospitalModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// hospital register
const hospitalRegister = async (req, res) => {
  const { regNo, name, address, phone, email, password } = req.body;

  try {
    const exist = await Hospital.findOne({ regNo });

    if (exist) {
      return res
        .status(400)
        .json({ error: 'Hospital with registration number already exist.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const hospital = await Hospital.create({
      regNo,
      name,
      address,
      phone,
      email,
      password: hash,
    });

    const token = generateToken(hospital._id);
    res.status(200).json({ ...hospital, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// hospital login
const hospitalLogin = async (req, res) => {
  const { regNo, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ regNo });

    if (!hospital) {
      return res
        .status(400)
        .json({ error: 'Hospital with registration number does not exist.' });
    }

    const match = await bcrypt.compare(password, hospital.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password.' });
    }

    const token = generateToken(hospital._id);

    const response = {
      regNo: hospital.regNo,
      name: hospital.name,
      address: hospital.address,
      phone: hospital.phone,
      email: hospital.email,
      token,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateInformation = async (req, res) => {
  const { name, address, phone, email, password } = req.body;

  console.log(name, address, phone, email);

  try {
    if (password?.length > 0) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const hospital = await Hospital.findOneAndUpdate(
        { _id: req.hospital._id },
        { $set: { password: hash } }
      ).select('-password');

      return res
        .status(200)
        .json({ message: 'Password updated successfully.' });
    }
    const hospital = await Hospital.updateOne(
      { _id: req.hospital._id },
      { $set: { name, address, phone, email } }
    ).select('-password');

    console.log(hospital);

    res.status(200).json({ message: 'Information updated successfully.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { hospitalRegister, hospitalLogin, updateInformation };
