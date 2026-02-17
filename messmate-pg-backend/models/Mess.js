const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mess = sequelize.define('Mess', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    len: [3, 100]  
    }
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
    len: [2, 100]
  }
},
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1000
    }
  },
  rating: {
  type: DataTypes.DECIMAL(2,1),
  defaultValue: 0.0,
  validate: {
    min: 0,
    max: 5
  }
}
}, {
  tableName: 'messes',
  timestamps: true
});

module.exports = Mess;
