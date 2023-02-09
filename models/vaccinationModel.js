const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vaccinationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  childernId: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: String,
    required: true,
  },
  mailed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
