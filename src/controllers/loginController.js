const loginService = require('../services/loginService');
require('dotenv').config();

const loginController = {
  async login(req, res) {
    const { email, password } = req.body;
    const { code, data } = await loginService.login(email, password);
    res.status(code).json(data);
  },
};
 
module.exports = loginController;
