// const Joi = require('joi');
// const Sequelize = require('sequelize');
// const models = require('../database/models');
// const validate = require('./validate');
// require('dotenv').config();

// const { Op } = Sequelize;

// const schemaBlogPost = Joi.object({
//   title: Joi.string().required(),
//   content: Joi.string().required(),
//   categoryIds: Joi.array().required(),
// });

// const schemaUpdatePost = Joi.object({
//   title: Joi.string().required(),
//   content: Joi.string().required(),
// });

// const verifyCategory = async (categories) => {
//   const categoriesFind = await Promise.all(
//     categories.map(async (category) => models.Category.findByPk(category, { raw: true })),
//   );
//   const categoryExisted = categoriesFind.filter((category) => category !== null);

//   if (categoryExisted.length > 0) return categoryExisted;
//   return false;
// };

// const postService = {
//   async create(values, userId) {
//     const validateError = validate(schemaBlogPost)(values);
//     if (validateError) return { code: 400, data: { message: 'Some required fields are missing' } };
  
//     const categoryExisted = await verifyCategory(values.categoryIds);
//     if (!categoryExisted) return { code: 400, data: { message: '"categoryIds" not found' } };
  
//   const newPostValues = {
//     title: values.title,
//     content: values.content,
//     userId,
//   };
//   const newBlogPost = await models.BlogPost.create(newPostValues);
//     Promise.all(
//       categoryExisted.map(async ({ id }) => models.PostCategory.create({ 
//         postId: newBlogPost.id, categoryId: id })),
//     );
//     return { code: 201, data: newBlogPost }; 
//   },

//   async findAll() {
//     return models.BlogPost.findAll(
//       {
//         include: [
//           { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
//           { model: models.Category, as: 'categories' },
//         ],
//       },
//     );
//   },

//   async finByPk(id) {
//     const post = await models.BlogPost.findByPk(
//       id,
//       {
//         include: [
//         { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
//         { model: models.Category, as: 'categories' },
//         ],
//       },
//     );

//     if (!post) return { code: 404, data: { message: 'Post does not exist' } };
//     return { code: 200, data: post };
// },

// async update(values, postId, userId) {
//   if (postId !== userId) return { code: 401, data: { message: 'Unauthorized user' } };
//   const validateError = validate(schemaUpdatePost)(values);
//     if (validateError) return { code: 400, data: { message: 'Some required fields are missing' } };
    
//   const updateValues = {
//     title: values.title,
//     content: values.content,
//   };
//   await models.BlogPost.update(updateValues, { where: { id: postId } });
//   const updateBlogPost = await models.BlogPost.findByPk(
//     postId,
//     {
//       include: [
//         { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
//         { model: models.Category, as: 'categories' },
//       ],
//     },
//   );

//   return { code: 200, data: updateBlogPost };
// },

// async remove(postId, userId) {
//   const deleteBlogPost = await models.BlogPost.findByPk(postId);
//     if (!deleteBlogPost) return { code: 404, data: { message: 'Post does not exist' } };
//     if (deleteBlogPost.userId !== userId) {
//       return { code: 401, data: { message: 'Unauthorized user' } };
//     }
//     await models.PostCategory.destroy({ where: { postId } });
//     await models.BlogPost.destroy({ where: { id: postId } });
//     return { code: 204, data: '' };
// },

// async search(search) {
//   if (search.length <= 0) {
//     return models.BlogPost.findAll(
//       { include: [
//         { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
//         { model: models.Category, as: 'categories' },
//       ] },
//     );
//   }
//     return models.BlogPost.findAll({ where: { [Op.or]: [
//       { title: { [Op.like]: `%${search}%` } }, { content: { [Op.like]: `%${search}%` } },
//     ] },
//     include: [
//       { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
//       { model: models.Category, as: 'categories' },
//     ],
//   });
// },
// };

// module.exports = postService;