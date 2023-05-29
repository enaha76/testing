const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
}, {
  timestamps: true, // Add createdAt and updatedAt columns
  createdAt: 'created_at', // Customize the column name if needed
  updatedAt: 'updated_at' // Customize the column name if needed
});

module.exports = logintests;
