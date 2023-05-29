const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import the configured Sequelize instance

const logintests = sequelize.define('logintests', {

  email: { 
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reponse: { 
    type: DataTypes.JSON,
  },
  repExcepte: {
    type: DataTypes.JSON,
    allowNull: false
  }

});

module.exports = logintests;
