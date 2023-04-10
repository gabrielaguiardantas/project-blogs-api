const PostsCategory = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('posts_categories', {}, {
   timestamps: false
  });

  PostsCategory.associate = (models) => {
    models.blog_posts.belongsToMany(models.categories, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'category_id', // se refere ao id de Book na tabela de `users_books`
      otherKey: 'post_id', // se refere a outra chave de `users_books`
    });
    models.categories.belongsToMany(models.blog_posts, {
      as: 'blog_posts',
      through: PostsCategory,
      foreignKey: 'post_id', // se refere ao id de User na tabela de `users_books`
      otherKey: 'category_id',
    });
  };
  return PostsCategory;
 };
 
 module.exports = PostsCategory;