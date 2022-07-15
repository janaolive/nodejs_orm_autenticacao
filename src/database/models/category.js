const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */

const attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING
  },
};


/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const category = sequelize.define("Categories", attributes, { tableName: 'Categories' });
  return category;
};