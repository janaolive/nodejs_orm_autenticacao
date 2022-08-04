const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authorization = require('../middlewares/authorization');

const usersRoutes = Router();

usersRoutes.post('/', usersController.create);
usersRoutes.get('/', authorization.auth, usersController.findAll);
usersRoutes.get('/:id', authorization.auth, usersController.findByPk);
usersRoutes.delete('/me', authorization.auth, usersController.remove);

module.exports = usersRoutes;