const { User } = require('../models');

const getByUser = async (email, password) => {
  const validUser = await User.findOne({ where: { email, password } });
  if (validUser) return validUser;

  return { message: 'Invalid fields' };
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return user;

  return { message: 'User not found' };
};

const getByUserId = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (user) return user;

  return { message: 'User does not exist' };
};

const getAllUsers = async () => {
  const allUsers = await User.findAll({ attributes: { exclude: ['password'] } });
  return allUsers;
};

const createUser = async (displayName, email, password, image) => {
  const userAlreadyRegistered = await User.findOne({ where: { email } });
  if (userAlreadyRegistered) return { message: 'User already registered' };

  const newUser = await User.create({ displayName, email, password, image });
  return newUser;
};

const deleteYourself = async (id) => {
  await User.destroy({ where: { id } });

  const deletedUser = await getByUserId(id);

  return !deletedUser;
};

module.exports = {
  getByUser,
  createUser,
  getByEmail,
  getAllUsers,
  getByUserId,
  deleteYourself,
};