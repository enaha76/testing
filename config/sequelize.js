const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mauripaytests', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
