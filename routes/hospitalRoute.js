const express = require('express');
const {
  hospitalRegister,
  hospitalLogin,
} = require('../controllers/hospitalController');

const router = express.Router();

// @desc   : hospital register
// @route  : POST /api/hospital/register
// @access : public
router.post('/register', hospitalRegister);

// @desc   : hospital login
// @route  : POST /api/hospital/login
// @access : public
router.post('/login', hospitalLogin);

module.exports = router;
