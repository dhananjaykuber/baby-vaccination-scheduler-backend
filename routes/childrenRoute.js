const express = require('express');
const {
  getChildrens,
  getChildren,
  childrenRegister,
  deleteChildren,
  updateChildren,
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

// @desc   : update children
// @route  : PATCH /api/children/:id
// @access : private
router.patch('/:id', authMiddleware, updateChildren);

// @desc   : delete children
// @route  : DELETE /api/children/:id
// @access : private
router.delete('/:id', authMiddleware, deleteChildren);

// @desc   : children register
// @route  : POST /api/children/register
// @access : private
router.post('/register', authMiddleware, childrenRegister);

module.exports = router;
