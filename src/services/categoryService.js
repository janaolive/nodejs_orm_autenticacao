const Joi = require('joi');
const models = require('../database/models');
const validate = require('../middlewares/validate');
require('dotenv').config();

const schemaCategory = Joi.object({
  name: Joi.string().required().max(255).messages({
    'any.required': '400|"name" is required',
  }),
});

const categoryService = {
  async create(values) {
    const isError = validate(schemaCategory)(values);
    if (isError) {
      return { code: isError[0], data: { message: isError[1] } };
    }

    const newCategory = await models.Category.create({ name: values.name });
    return { code: 201, data: newCategory };
  },

  async findAll() {
    return models.Category.findAll();
  },
  
};

module.exports = categoryService;