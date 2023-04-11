const PostsCategory = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('posts_categories', {}, {
   timestamps: false
  });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'category_id', // se refere ao id de Book na tabela de `users_books`
      otherKey: 'post_id', // se refere a outra chave de `users_books`
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostsCategory,
      foreignKey: 'post_id', // se refere ao id de User na tabela de `users_books`
      otherKey: 'category_id',
    });
  };
  return PostsCategory;
 };
 
 module.exports = PostsCategory;