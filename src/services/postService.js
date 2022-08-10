const Joi = require('joi');
const models = require('../database/models');
const validate = require('../middlewares/validate');
require('dotenv').config();

const schemaPost = Joi.object({ 
  title: Joi.string().required().max(255),
  content: Joi.string().required().max(255),
  categoryIds: Joi.array().required(),
});

const checkCategory = async (categories) => {
  const findCategory = await Promise.all(
    categories.map(async (category) => models.Category.findByPk(category, { raw: true })),
  );
  const existingCategories = findCategory.filter((category) => category != null);
    if (existingCategories.length > 0) return existingCategories;
    return false;
};

const postService = {
  async create(values, userId) {
    const isError = validate(schemaPost)(values);
    if (isError) return { code: 400, data: { message: 'Some required fields are missing' } };
    
    const existingCategories = await checkCategory(values.categoryIds);
    if (!existingCategories) return { code: 400, data: { message: '"categoryIds" not found' } }; 

    const postValues = {
      title: values.title,
      content: values.content,
      userId,
    };

    const newPost = await models.BlogPost.create(postValues);
    console.log(`post ${newPost}`);
    await Promise.all(
      existingCategories.map(async ({ id }) => models.PostCategory
      .create({ postId: newPost.id, categoryId: id })),
      );
    return { code: 201, data: newPost };
  },

  async findAll() {
    return models.BlogPost.findAll(
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: models.Category, as: 'categories' },
        ],
      },
    );
  },

  async findByPk(id) {
    const post = await models.BlogPost.findByPk(id,
      {
        include: [
          { model: models.User, as: 'user', attributes: { exclude: ['password'] } },
          { model: models.Category, as: 'categories' },
        ],
      });
    if (!post) return { code: 404, data: { message: 'Post does not exist' } };
      return { code: 200, data: post };
    },
};

module.exports = postService;