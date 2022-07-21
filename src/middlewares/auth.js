const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try { 
    jwt.verify(authorization, secret);
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const readToken = (token) => jwt.verify(token, secret);

module.exports = {
  auth,
  readToken,
};
