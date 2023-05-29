// user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Import the configured Sequelize instance

const logintest = sequelize.define('logintest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reponse:{
    type:DataTypes.JSON,
  

  },
  repExcepte:{
    type:DataTypes.JSON,
    allowNull: false
  }
 
});

module.exports = logintest;
