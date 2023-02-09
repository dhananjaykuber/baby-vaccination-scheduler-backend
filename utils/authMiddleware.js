const Hospital = require('../models/hospitalModel');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }

  const token = authorization.split(' ')[1];

  try {
    // verify token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.hospital = await Hospital.findOne({ _id }).select('_id');

    if (req.hospital === null) {
      return res.status(401).json({ error: 'Request is not authorized' });
    }

    next();
  } catch (error) {
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

module.exports = authMiddleware;
