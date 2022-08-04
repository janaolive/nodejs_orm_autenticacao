// const Joi = require('joi');

// const { Category } = require('../database/models');
// const validate = require('./validate');
// require('dotenv').config();

// const schemaCategory = Joi.object({
//   name: Joi.string().required().messages({ 
//     'any.required': '400|"name" is required',
//   }),
// });

// const categoryService = {
//   async create(values) {
//     const validateError = validate(schemaCategory)(values);
//     if (validateError) {
//       return { code: validateError[0], data: { message: validateError[1] } };
//     }

//     const newCategory = await Category.create({ name: values.name });
//     return { code: 201, data: newCategory };
//   },

//   async findAll() {
//     return Category.findAll();
//   },
// };

// module.exports = categoryService;
