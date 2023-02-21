const express = require('express');
const {
  updateInformation,
  hospitalRegister,
  hospitalLogin,
} = require('../controllers/hospitalController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// @desc   : hospital update information
// @route  : PATCH /api/hospital/
// @access : private
router.patch('/', authMiddleware, updateInformation);

// @desc   : hospital register
// @route  : POST /api/hospital/register
// @access : public
router.post('/register', hospitalRegister);

// @desc   : hospital login
// @route  : POST /api/hospital/login
// @access : public
router.post('/login', hospitalLogin);

module.exports = router;
