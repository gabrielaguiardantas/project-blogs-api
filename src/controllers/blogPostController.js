const blogPostService = require('../services/blogPostService');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const newBlogPost = await blogPostService.createBlogPost(id, title, content, categoryIds);

  return res.status(201).json(newBlogPost);
};

module.exports = {
  createBlogPost,
};