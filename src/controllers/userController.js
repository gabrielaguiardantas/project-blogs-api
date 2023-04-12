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
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image = null } = req.body;
    const newUser = await userService.createUser(displayName, email, password, image);

    if (newUser.message) return res.status(409).json(newUser);

    const payload = {
      username: email,
      admin: false };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();

    return res.status(200).json(allUsers);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await userService.getByUserId(id);

    if (user.message) return res.status(404).json(user);

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createLogin,
  createUser,
  getAllUsers,
  getByUserId,
};