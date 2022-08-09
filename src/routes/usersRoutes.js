const { Router } = require('express');
const usersController = require('../controllers/usersController');
const auth = require('../middlewares/auth');

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.get('/', auth.auth, usersController.findAll);
usersRoutes.get('/:id', auth.auth, usersController.findByPk);
// usersRoutes.delete('/me', auth.auth, usersController.remove);

module.exports = usersRoutes;