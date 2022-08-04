const authService = require('../services/authService');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

require('dotenv').config();

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  },

  validateToken: async (req, res, next) => {
    const { authorization } = req.headers;
    jwtMiddleware.validateToken(authorization);
    next();
  },
};
 
module.exports = authController;
