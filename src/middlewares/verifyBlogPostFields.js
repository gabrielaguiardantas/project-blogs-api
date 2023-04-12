const categoryService = require('../services/categoryService');

const verifyBlogPostFields = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  
  if (!title || !content || !categoryIds) {
    return res.status(400).json({
    message: 'Some required fields are missing',
    }); 
  }

  const allCategories = await categoryService.getAllCategories();
  const allCategoriesId = allCategories.map((category) => category.id);

  if (!categoryIds.every((category, index) => allCategoriesId[index] === category)) {
    return res.status(400).json({
    message: 'one or more "categoryIds" not found',
    }); 
  } 
  next();
};

module.exports = {
  verifyBlogPostFields,
};