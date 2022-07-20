const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    published: {
      allowNull: true,
      type:DataTypes.DATE,
    },
    updated: {
      allowNull: true,
      type:DataTypes.DATE,
    },
  },
  {
    timestamp: false,
    tableName: 'Users',
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey:'userId', as: 'user' });
  };

  return BlogPost;
};

module.exports = BlogPost;
