const {DataTypes}=require('sequelize')
const sequelize=require('../config/sequelize')


const users = sequelize.define('users', {

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
  });
  
  module.exports = users;
  