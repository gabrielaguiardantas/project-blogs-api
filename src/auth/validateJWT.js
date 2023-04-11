const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
    message: 'Token not found',
    }); 
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getByEmail(decoded.username);
    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateJWT;