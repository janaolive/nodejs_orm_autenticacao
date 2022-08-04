// const Joi = require('joi');

// const jwt = require('jsonwebtoken');

// const validate = require('./validate');

// const models = require('../database/models');
// require('dotenv').config();

// const schemaUser = Joi.object({
//   displayName: Joi.string().min(8).max(255).required()
// .messages({ 
//     'string.min': '400|"displayName" length must be at least 8 characters long',
//   }),
//   email: Joi.string().email().max(255).required()
// .messages({
//     'string.email': '400|"email" must be a valid email',
//   }),
//   password: Joi.string().min(6).max(255).required()
// .messages({
//     'string.min': '400|"password" length must be at least 6 characters long',
//   }),
//   image: Joi.string().max(255),
// });

// const usersService = {
//   async create(values) {
//     const validateError = validate(schemaUser)(values);
//     if (validateError) {
//       return { code: validateError[0], data: { message: validateError[1] } };
//     }

//     const emailRegistred = await models.User.findOne({ where: { email: values.email } });
//     if (emailRegistred) return { code: 409, data: { message: 'User already registered' } };

//     const newUser = await models.User.create(values, { raw: true });
//     const { data: { id } } = newUser;
//     const token = jwt.sign({ data: id }, process.env.JWT_SECRET);
//     return { code: 201, data: { token } };
//   },

//   async findAll() {
//     return models.User.findAll({ exclude: ['password'] });
//   },

//   async findByPk(id) {
//     const user = await models.User.findByPk(id, { raw: true });
//     if (!user) return { code: 404, data: { message: 'User does not exist' } };

//     const { password, ...fieldsUser } = user;
//     return { code: 201, data: fieldsUser };
//   },

//   async remove(id) {
//     const userPost = await models.User.findAll({ where: { userId: id } }, { raw: true });

//     await Promise.all(
//       userPost.map(async (post) => models.PostCategory.destroy({ where: { postId: post.id } })),
//     );
//     await models.BlogPost.destroy({ where: { userId: id } });
//     await models.User.destroy({ where: { id } });
//   },
// };

// module.exports = usersService;