const sequelize = require('../database');
const Alumni = require('../Alumni');
const Education = require('../Education');
const WorkExperience = require('../WorkExperience');

// Define the relationships
Alumni.hasMany(Education, { foreignKey: 'alumniId' });
Education.belongsTo(Alumni, { foreignKey: 'alumniId' });

Alumni.hasMany(WorkExperience, { foreignKey: 'alumniId' });
WorkExperience.belongsTo(Alumni, { foreignKey: 'alumniId' });

// Sync all models to the database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database and tables created/updated!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

module.exports = {
  sequelize,
  Alumni,
  Education,
  WorkExperience
};