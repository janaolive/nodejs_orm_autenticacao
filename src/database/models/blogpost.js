const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING
  },
  contente: {
    allowNull: false,
    type: Sequelize.STRING
  },
  userId: {
    allowNull: false,
    type: Sequelize.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  published: {
    allowNull: false,
    type:Sequelize.STRING,
    TIMESTAMP: true,
  },
  updated: {
    allowNull: false,
    type:Sequelize.STRING,
    TIMESTAMP: true,
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports  = (sequelize) => {
  const blogpost = sequelize.define("BlogPosts", attributes, { tableName: 'BlogPosts' });
  blogpost.associate = (models) => {
    blogpost.hasMany(models.user, { key: 'id', as: 'user' });
  };
  return blogpost;
};