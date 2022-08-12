const { Router } = require('express');
const auth = require('../middlewares/auth');
const postController = require('../controllers/postController');

const postRoutes = Router();

postRoutes.get('/:id', auth.auth, postController.findByPk);
postRoutes.put('/:id', auth.auth, postController.update);
postRoutes.get('/', auth.auth, postController.findAll);
postRoutes.post('/', auth.auth, postController.create);

module.exports = postRoutes;