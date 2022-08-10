const { Router } = require('express');
const postController = require('../controllers/postController');

const postRoutes = Router();

postRoutes.post('/', postController.create);

module.exports = postRoutes;