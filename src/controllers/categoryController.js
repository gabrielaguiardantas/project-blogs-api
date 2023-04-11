const categoryService = require('../services/categoryService');

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await categoryService.createCategory(name);

    if (!name) {
      return res.status(400).json({
      message: '"name" is required',
      }); 
    }
    return res.status(201).json(newCategory);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryService.getAllCategories();

    return res.status(200).json(allCategories);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};