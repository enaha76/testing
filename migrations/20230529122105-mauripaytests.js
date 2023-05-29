'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('logintests', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
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
    await queryInterface.dropTable('logintests');
  }
};
