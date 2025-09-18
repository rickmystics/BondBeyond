const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Education = sequelize.define('Education', {
  degree: {
    type: DataTypes.STRING
  },
  university: {
    type: DataTypes.STRING
  },
  graduation_year: {
    type: DataTypes.INTEGER
  }
});

module.exports = Education;