const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

const secret = process.env.JWT_SECRET;

const loginService = {
  async login(email, countersign) {
    if (!email || !countersign) {
      return { code: 400, data: { message: 'Some required fields are missing' } };
    }

    const user = await User.findOne({
      where: { email, password: countersign },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

      if (!user) return { code: 400, data: { message: 'Invalid fields' } };
      const { id } = user;
      const token = jwt.sign({ data: id }, secret);

      return { code: 200, data: { token } };
  },
};

module.exports = loginService;
