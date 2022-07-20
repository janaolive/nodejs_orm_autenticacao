const { Router } = require('express');
const usersController = require('../controllers/usersController');

const usersRoutes = Router();

usersRoutes.post('/', usersController.add);

module.exports = usersRoutes;