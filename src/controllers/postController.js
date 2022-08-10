const auth = require('../middlewares/auth');
const postService = require('../services/postService');

const postController = {
  async create(req, res) {
    const userId = auth.auth.readToken(req.headers.authorization);
    const { code, data } = await postService.create(req.body, userId.data);
    
    res.status(code).json(data);
  },
};

module.exports = postController;