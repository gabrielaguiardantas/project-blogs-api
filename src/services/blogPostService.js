const Sequelize = require('sequelize');
const { BlogPost, PostCategory } = require('../models');
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
    console.log('esse aquiiii', newBlogPost.id);
    // await Promise.all(categoryIds.map(async (category) => {
  
    //   await PostCategory.create({ postId: newBlogPost.id, categoryId: category });
    //   }));
    const postCategories = categoryIds.map((category) => ({
      postId: newBlogPost.id,
      categoryId: category,
    }));
    console.log(postCategories);
    await PostCategory.bulkCreate(postCategories, { transaction });
    return newBlogPost;
  });

  return newEntry;
};

module.exports = {
  createBlogPost,
};