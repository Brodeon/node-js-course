const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/nodejs-course')

module.exports = sequelize;