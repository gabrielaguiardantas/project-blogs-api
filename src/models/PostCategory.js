const PostsCategory = (sequelize, DataTypes) => {
  const PostsCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog_posts',
        key: 'post_id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'category_id'
      }
    }
  }, {
   timestamps: false,
   tableName: 'posts_categories',
   underscored: true
  });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostsCategory,
      foreignKey: 'categoryId', // se refere ao id de Book na tabela de `users_books`
      otherKey: 'postId', // se refere a outra chave de `users_books`
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blog_posts',
      through: PostsCategory,
      foreignKey: 'postId', // se refere ao id de User na tabela de `users_books`
      otherKey: 'categoryId',
    });
  };
  return PostsCategory;
 };
 
 module.exports = PostsCategory;