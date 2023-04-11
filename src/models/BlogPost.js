const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
     },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
   timestamps: true,
   created_at: 'published',
   updated_at: 'updated',
   tableName: 'blog_posts'
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {  as: 'users' });
    };
 
  return BlogPost;
 };
 
 module.exports = BlogPost;