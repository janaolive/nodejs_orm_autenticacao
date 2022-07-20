const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { throwUnauthorizedError } = require('./utils');

const secret = process.env.JWT_SECRET;

const loginService = {
  async validateAuthorization(unknown) {
    const schema = Joi.string().required();
    try {
      const result = await schema.validateAsync(unknown);
      const [, token] = result.split(' ');
      return token;
    } catch (error) {
      throwUnauthorizedError();
    }
  },

  async validateBodyLogin(unknown) {
    const schema = Joi.object({
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().max(255),
    });
    const result = await schema.validateBodyLogin(unknown);
    return result;
  },

  async makeToken(user) {
    const { id, name } = user;
    const payload = { data: { id, name } };
    const token = jwt.sign(payload, secret);
    return token;
  },

  async readToken(token) {
    try {
      const { data } = jwt.verify(token, secret);
      return data;
    } catch (error) {
      throwUnauthorizedError();
    }
  },
};

module.exports = loginService;
