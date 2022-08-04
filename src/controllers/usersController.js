// const authorization = require('../middlewares/authorization');
// const usersService = require('../services/usersService');

// const usersController = {
//   async create(req, res) {
//     const { code, data } = await usersService.create(req.body);
    
//     res.status(code).json(data);
//   },

//   async findAll(_req, res) {
//     const users = await usersService.findAll();

//     res.json(users);
//   },

//   async findByPk(req, res) {
//     const { id } = req.params;
//     const { code, data } = await usersService.findByPk(+id);
//     res.status(code).json(data); 
//   },

//   async remove(req, res) {
//     const userId = await authorization.readToken(req.headers.authorization);
//     await usersService.remove(userId.data);
//     res.status(204).end();
//   },
// };

// module.exports = usersController;