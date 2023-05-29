const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

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
}, {
  timestamps: true, // Add createdAt and updatedAt columns
  createdAt: 'created_at', // Customize the column name if needed
  updatedAt: 'updated_at' // Customize the column name if needed
});

module.exports = users;
