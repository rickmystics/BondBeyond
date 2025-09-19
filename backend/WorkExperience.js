const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const WorkExperience = sequelize.define('WorkExperience', {
  job_title: {
    type: DataTypes.STRING
  },
  company: {
    type: DataTypes.STRING
  },
  start_date: {
    type: DataTypes.DATE
  },
  end_date: {
    type: DataTypes.DATE
  }
});

module.exports = WorkExperience;