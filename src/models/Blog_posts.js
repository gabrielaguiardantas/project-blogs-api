const Blog_post = (sequelize, DataTypes) => {
  const Blog_post = sequelize.define('blog_posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
   timestamps: true,
   created_at: 'published',
   updated_at: 'updated'
  });
 
  return Blog_post;
 };
 
 module.exports = Blog_post;