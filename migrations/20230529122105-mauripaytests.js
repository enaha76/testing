'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logintest', {
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('logintest');
  }
};
