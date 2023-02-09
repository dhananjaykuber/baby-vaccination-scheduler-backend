const express = require('express');
const {
  getChildrens,
  getChildren,
  childrenRegister,
} = require('../controllers/childrenController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

// @desc   : get children
// @route  : GET /api/children/
// @access : private
router.get('/', authMiddleware, getChildrens);

// @desc   : get children
// @route  : GET /api/children/:id
// @access : private
router.get('/:id', authMiddleware, getChildren);

// @desc   : children register
// @route  : POST /api/children/register
// @access : private
router.post('/register', authMiddleware, childrenRegister);

module.exports = router;
