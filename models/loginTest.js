const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Logintests = sequelize.define('logintests', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reponse: { 
    type: DataTypes.JSON,
    allowNull: false

  },
  repExcepte: {
    type: DataTypes.JSON,
    allowNull: false
  }
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Logintests;
