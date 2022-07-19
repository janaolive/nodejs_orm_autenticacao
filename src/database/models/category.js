const Category = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
},
{
  timestamp: false,
  tableName: 'Categories',
  underscored: true,
});

Category.associate = (models) => {
  Category.hasMany(models.PostCategory,
    { foreignKey:'categoryId', as: 'postCategories' });
};

return Category;
};

module.exports = Category;  