// ref. de consulta: https://www.npmjs.com/package/joi

const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const validate = require('./validate');

const secret = process.env.JWT_SECRET;

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
    const isErrorValidate = validate(schemaUser)(values);
    if (isErrorValidate) {
      return { code: isErrorValidate[0], data: { message: isErrorValidate[1] } };
    }

    const emailIsRegistred = await User.findOne({ where: { email: values.email } });
    if (emailIsRegistred) return { code: 409, data: { message: 'User already registered' } };

    const newUser = await User.create(values, { raw: true });
    const { dataValues: { id } } = newUser;
    const token = jwt.sign({ data: id }, secret);
    return { code: 201, data: { token } };
  },

  async findAll() {
    return User.findAll({ exclude: ['createdAt', 'updatedAt'] });
  },

  async findByPk(id) {
    const user = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] } });
    if (!user) return { code: 404, data: { message: 'User does not exist' } };

    const { password, ...fieldsUser } = user;
    return { code: 201, data: fieldsUser };
  },
};

module.exports = usersService;