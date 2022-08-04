require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtMiddleware = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (token) => {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return data;
    } catch (e) {
      const error = new Error('Token not found');
      error.name = 'UnauthorizedError';
      throw error; 
    }
  },
};

module.exports = jwtMiddleware;