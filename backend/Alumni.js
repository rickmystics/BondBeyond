const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Alumni = sequelize.define('Alumni', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  photo_url: {
    type: DataTypes.STRING
  },
  batch_year: {
    type: DataTypes.INTEGER
  },
  department: {
    type: DataTypes.STRING
  },
  current_job_title: {
    type: DataTypes.STRING
  },
  current_company: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  }
});

module.exports = Alumni;