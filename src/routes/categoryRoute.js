const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

const categoryRoutes = Router();

categoryRoutes.post('/', auth.auth, categoryController.create);
categoryRoutes.get('/', auth.auth, categoryController.findAll);

module.exports = categoryRoutes;