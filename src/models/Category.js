const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define('categories', {
    name: DataTypes.STRING
  }, {
   timestamps: false
  });
 
  return Category;
 };
 
 module.exports = Category;