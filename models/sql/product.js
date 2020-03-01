const Sequelize = require('sequelize').Sequelize;
const sequelize = require('../util/sql/database');

const Product = sequelize.define('product', {
  id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },

  title: {
      type: Sequelize.STRING,
      allowNull: false,
  },

  price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
          min: 0.00
      }
  },

  imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
  },

  description: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

module.exports = Product;
