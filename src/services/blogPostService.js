const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config[process.env.NODE_ENV]);

const createBlogPost = async (id, title, content, categoryIds) => {
  const newEntry = await sequelize.transaction(async (transaction) => {
    const newBlogPost = await BlogPost.create({ 
      userId: id,
      title,
      content,
      categoryIds, 
      published: new Date(),
      updated: new Date() }, { transaction });

    const postCategories = categoryIds.map((category) => ({
      postId: newBlogPost.id,
      categoryId: category,
    }));
  
    await PostCategory.bulkCreate(postCategories, { transaction });
    return newBlogPost;
  });

  return newEntry;
};

const getAllblogPosts = async () => {
  const allBlogPosts = await BlogPost.findAll({
    include: [{ 
      model: User, 
      as: 'user', 
      attributes: { exclude: ['password'] }, 
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return allBlogPosts;
};

const getBlogPostsById = async (id) => {
  const blogPostById = await BlogPost.findOne({ where: { id },
    include: [{ 
      model: User, 
      as: 'user', 
      attributes: { exclude: ['password'] }, 
    }, {
      model: Category,
      as: 'categories',
    }] });

  return blogPostById;
};

const updateBlogPostById = async (id, title, content) => {
  const updatedBlogPostById = await BlogPost
  .update({ title, content }, { where: { id }, 
    include: [{ 
    model: User, 
    as: 'user', 
    attributes: { exclude: ['password'] }, 
  }, {
    model: Category,
    as: 'categories',
  }] });

  return updatedBlogPostById;
};

const deleteBlogPostById = async (id) => {
  await BlogPost.destroy({ where: { id } });

  const deletedBlogPost = await getBlogPostsById(id);

  return !deletedBlogPost;
};

const getBlogPostsByTerm = async (term) => {
  const allBlogPosts = await BlogPost.findAll({ 
    where: { 
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
    include: [{ 
      model: User, 
      as: 'user', 
      attributes: { exclude: ['password'] }, 
    }, {
      model: Category,
      as: 'categories',
    }],
  });

  return allBlogPosts;
};

module.exports = {
  createBlogPost,
  getAllblogPosts,
  getBlogPostsById,
  updateBlogPostById,
  deleteBlogPostById,
  getBlogPostsByTerm,
};