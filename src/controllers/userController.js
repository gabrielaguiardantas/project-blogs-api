const jwt = require('jsonwebtoken');
const userService = require('../services/userService');

const genericError = { message: 'Ocorreu um erro' };

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
      id: user.id,
      admin: false };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }); 
    return res.status(200).json({ token });
  } catch (e) {
    res.status(500).json(genericError);
  }
};

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image = null } = req.body;
    const newUser = await userService.createUser(displayName, email, password, image);

    if (newUser.message) return res.status(409).json(newUser);

    const payload = {
      username: email,
      id: newUser.id,
      admin: false };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
    
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json(genericError);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userService.getAllUsers();

    return res.status(200).json(allUsers);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(genericError);
  }
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getByUserId(id);

    if (user.message) return res.status(404).json(user);

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json(genericError);
  }
};

const deleteYourself = async (req, res) => {
  const { authorization } = req.headers;
  const decoded = jwt.decode(authorization);
  console.log(decoded);
  try {
    await userService.deleteYourself(decoded.id);

    return res.status(204).json();
  } catch (e) {
    console.log(e.message);
    res.status(500).json(genericError);
  }
};

module.exports = {
  createLogin,
  createUser,
  getAllUsers,
  getByUserId,
  deleteYourself,
};