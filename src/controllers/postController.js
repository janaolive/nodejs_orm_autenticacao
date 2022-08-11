const auth = require('../middlewares/auth');
const postService = require('../services/postService');

const postController = {
  async create(req, res) {
    const { id } = auth.readToken(req.headers.authorization);
    // console.log(`post controller ${id}`);
    const { code, data } = await postService.create(req.body, id);
    return res.status(code).json(data);
  },

  async findAll(_req, res) {
    const posts = await postService.findAll();
    return res.json(posts);
  },
    
  async findByPk(req, res) {
    const { code, data } = await postService.findByPk(req.params.id);
    return res.status(code).json(data); 
  },
};

module.exports = postController;