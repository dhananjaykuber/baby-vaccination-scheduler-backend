const express = require('express');
const {
  getVaccinations,
  updateStatus,
  getTodaysVaccination,
} = require('../controllers/vaccinationController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// @desc   : get todays vaccination
// @route  : GET /api/vaccination/get-todays-vaccination
// @access : private
router.get('/get-todays-vaccination', authMiddleware, getTodaysVaccination);

// @desc   : get vaccination of user by id
// @route  : GET /api/vaccination/:id
// @access : public
router.get('/:id', getVaccinations);

// @desc   : update vaccination status of user
// @route  : PATCH /api/vaccination/:id
// @access : public
router.patch('/:id', authMiddleware, updateStatus);

module.exports = router;
