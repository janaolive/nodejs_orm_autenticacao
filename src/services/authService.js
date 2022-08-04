// const Joi = require('joi');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const models = require('../database/models');

const authService = {
  // validateBody: (data) => {
  //   const schema = Joi.object({
  //     email: Joi.string().email().required().max(255),
  //     password: Joi.string().required().max(255),
  //   }).messages({
  //     'any.required'
  //   });

  //   const { error } = schema.validate(data);
  //   if (error) new Error('');
  //   console.log(data);
  //   return data;
  // },

  login: async (email, password) => {
    if (!email || !password) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }
    
    const user = await models.User.findOne({ where: { email, password } });
    if (!user) {
      console.log(user);
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const token = jwtMiddleware.createToken(user);
    return token;
  },

  validateToken: (token) => {
    const data = jwtMiddleware.validateToken(token);
    return data;
  },

};

module.exports = authService;
