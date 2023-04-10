const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const { JWT_SECRET } = process.env;

const createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Some required fields are missing', 
    }); 
    }
    const user = await userService.getByUser(email, password);
    if (user.message) return res.status(400).json(user);
    const payload = {
      username: req.body.email,
      admin: false };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createLogin,
};