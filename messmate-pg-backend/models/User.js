// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: true, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  failedLoginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastFailedLogin: { type: DataTypes.DATE, allowNull: true }
});

module.exports = User;




