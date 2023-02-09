const express = require('express');
const { sendEmail } = require('../controllers/mailController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// @desc   : send mail for vaccination
// @route  : POST /api/send-mail
// @access : private
router.post('/', sendEmail);
// router.post('/', authMiddleware, sendEmail);

module.exports = router;
