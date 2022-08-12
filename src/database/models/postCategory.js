const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define("PostCategory", {
  postId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'BlogPosts',
      key: 'id'
    }
  },
  categoryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
},
  {
    timestamps: false,
    tableName: 'PostCategories',
  });
  
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'categories'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'blogposts'
    });
  };
  return PostCategory;
  };
  
  module.exports = PostCategory;  