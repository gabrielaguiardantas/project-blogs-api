const { User } = require('../models');

const getByUser = async (email, password) => {
  const validUser = await User.findOne({ where: { email, password } });
  if (validUser) return validUser;

  return { message: 'Invalid fields' };
};

module.exports = {
  getByUser,
};