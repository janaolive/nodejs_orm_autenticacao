const Joi = require('joi');
const jwt = require('jsonwebtoken');
const models = require('../database/models');
const validate = require('../middlewares/validate');
require('dotenv').config();

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).max(255).required()
  .messages({ 
    'string.min': '400|"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().max(255).required()
  .messages({
    'string.email': '400|"email" must be a valid email',
  }),
  password: Joi.string().min(6).max(255).required()
  .messages({
    'string.min': '400|"password" length must be at least 6 characters long',
  }),
  image: Joi.string().max(255),
});

const usersService = {
  async create(values) { 
    const isError = validate(schemaUser)(values);
    if (isError) {
      return { code: isError[0], data: { message: isError[1] } };
    }
  
    const registredEmail = await models.User.findOne({ where: { email: values.email } });
    if (registredEmail) {
      return { code: 409, data: { message: 'User already registered' } };
    }

    const newUser = await models.User.create(values);
    const { dataValues: { id } } = newUser;
    console.log(`create token ${id}`);
    const token = jwt.sign({ id }, process.env.JWT_SECRET);
    return { code: 201, data: { token } };
  },

  async findAll() {
    return models.User.findAll({ attributes: { exclude: ['password'] } });
  },

  async findByPk(id) {
    const user = await models.User.findByPk(id, { raw: true });
    if (!user) return { code: 404, data: { message: 'User does not exist' } };
    const { password, ...fieldsUser } = user;
    return { code: 200, data: fieldsUser };
  },

  // async remove(id) {
  // },

};

module.exports = usersService;