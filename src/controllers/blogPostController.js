const blogPostService = require('../services/blogPostService');

const createBlogPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const newBlogPost = await blogPostService.createBlogPost(id, title, content, categoryIds);

  return res.status(201).json(newBlogPost);
};

const getAllBlogPosts = async (req, res) => {
  const allBlogPosts = await blogPostService.getAllblogPosts();

  return res.status(200).json(allBlogPosts);
};

const getBlogPostsById = async (req, res) => {
  const { id } = req.params;
  const blogPostById = await blogPostService.getBlogPostsById(+id);

  if (!blogPostById) {
    return res.status(404).json({
    message: 'Post does not exist',
    }); 
  }

  return res.status(200).json(blogPostById);
};

const updateBlogPostById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const usernameLoggedId = req.user.id;

  const blogPostBeforeUpdate = await blogPostService.getBlogPostsById(id);

  if (+usernameLoggedId !== +blogPostBeforeUpdate.userId) {
    return res.status(401).json({
    message: 'Unauthorized user',
    }); 
  }

  if (!title || !content) {
    return res.status(400).json({
    message: 'Some required fields are missing',
    }); 
  }
  await blogPostService.updateBlogPostById(id, title, content);

  const blogPostAfterUpdate = await blogPostService.getBlogPostsById(id);
  return res.status(200).json(blogPostAfterUpdate);
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostsById,
  updateBlogPostById,
};