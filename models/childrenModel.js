const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const childernSchema = new Schema(
  {
    motherName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    childernName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hospitalId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Childern', childernSchema);
