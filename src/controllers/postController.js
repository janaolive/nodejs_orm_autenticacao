// const authorization = require('../middlewares/authorization');
// const postService = require('../services/postService');

// const postController = {
//   async create(req, res) {
//     const userId = authorization.auth.readToken(req.headers.authorization);
//     const { code, data } = await postService.create(req.body, userId.data);
    
//     res.status(code).json(data);
//   },

//   async findAll(_req, res) {
//     const posts = await postService.findAll();

//     res.json(posts);
//   },

//   async findByPk(req, res) {
//     const { code, data } = await postService.findByPk(req.params.id);
//     res.status(code).json(data); 
//   },

//   async update(req, res) {
//     const userId = await authorization.readToken(req.headers.authorization);
//     const { code, data } = await postService.update(
//       req.body,
//       Number(req.params.id),
//       Number(userId.data),
//     );
//     res.status(code).json(data); 
//   },

//   async remove(req, res) {
//     const userId = await authorization.readToken(req.headers.authorization);
//     const { code, data } = await postService.remove(
//       req.body,
//       Number(req.params.id),
//       Number(userId.data),
//     );
//     res.status(code).json(data); 
//   },

//   async search(req, res) {
//     const data = await postService.search(req.query.q);
//     res.json(data); 
//   },
// };

// module.exports = postController;