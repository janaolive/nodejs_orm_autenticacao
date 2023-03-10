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
  timestamps: false,
  tableName: 'Categories',
});

Category.associate = (models) => {
  Category.hasMany(models.PostCategory,
    { foreignKey:'categoryId', as: 'postCategories' });
};

return Category;
};

module.exports = Category;  