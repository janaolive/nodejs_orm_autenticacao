const jwt = require('jsonwebtoken');
const models = require('../database/models');
require('dotenv/config');

const loginService = {
  async login(email, password) {
    if (!email || !password) {
    return { code: 400, data: { message: 'Some required fields are missing' } };
  }
   
    const user = await models.User.findOne({ 
      where: { email, password },
    });
    
    if (!user) return { code: 400, data: { message: 'Invalid fields' } };
    const { id } = user;
    console.log(`create token ${id}`);
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return { code: 200, data: { token } };
  },
};

module.exports = loginService;