const loginService = require('../services/loginService');
const userService = require('../services/usersService');

const loginController = {
  async login(req, res) {
    const data = await loginService.validateBodyLogin(req.body);
    const user = await userService.getByEmailOrThrwos(data.email);
    await userService.verifyPassword(data.password, user.passwordHash);
    const token = await loginService.makeToken(user);
    res.json({ token });
  },
};

module.exports = loginController;
