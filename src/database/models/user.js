const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  displayName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  image: {
    type:DataTypes.STRING  
  },
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports  = (sequelize) => {
  const user = sequelize.define("Users", attributes, { tableName: 'Users' });
  user.associate = (models) => {
    user.hasMany(models.blogpost, { key: 'userId', as: 'blogpost' });
  };
  return user;
};