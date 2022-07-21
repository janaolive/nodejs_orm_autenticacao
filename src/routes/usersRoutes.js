const { Router } = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');

const usersRoutes = Router();

usersRoutes.get('/', auth.auth, usersController.findAll);
usersRoutes.get('/:id', auth.auth, usersController.findUserById);
usersRoutes.post('/', usersController.create);

module.exports = usersRoutes;