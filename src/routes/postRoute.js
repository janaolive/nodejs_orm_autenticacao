const { Router } = require('express');
const postController = require('../controllers/postController');

const postRoutes = Router();

postRoutes.get('/search', postController.search);
postRoutes.get('/:id', postController.findByPk);
postRoutes.put('/:id', postController.update);
postRoutes.delete('/search', postController.remove);
postRoutes.get('/', postController.findAll);
postRoutes.post('/', postController.create);

module.exports = postRoutes;