const Joi = require('joi');
// ref. de consulta: https://www.npmjs.com/package/joi

const bcrypt = require('bcrypt');

const models = require('../database/models');

const { throwNotFoundError, throwUnauthorizedError } = require('./utils');

const usersService = {
  async validateBodyAdd(unknown) {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8).max(255),
      email: Joi.string().required().email().max(255),
      password: Joi.string().required().min(6).max(255),
      image: Joi.string().required().max(255),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },

  async validateParamsId(unknown) {
    const schema = Joi.object({
      id: Joi.number().required().positive().integer(),
    });
    const result = await schema.validateAsync(unknown);
    return result;
  },
  
  async add(data) {
    const modelHashed = {
      ...data,
      passwordHash: bcrypt.hash(data.passwordHash, 10),
    };
    const model = await models.user.create(modelHashed);
    const newUser = model.toJSON();
    const { passwordHash, ...user } = newUser;
    return user;
  },
  
  async list() {
    const users = await models.user.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },

  async getByEmailOrThrows(email) {
    const user = await models.users.findOne({
      where: { email },
      raw: true,
    });
    if (!user) throwNotFoundError('"user" not found');
    return user;
  },

  async verifyPassword(password, passwordHash) {
    try {
      await bcrypt.compare(password, passwordHash);
    } catch (error) {
      throwUnauthorizedError('"password" is invalid');
    }
  },
};
  
module.exports = usersService;