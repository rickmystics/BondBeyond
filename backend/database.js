const { Sequelize } = require('sequelize');

// Replace with your actual database credentials
const sequelize = new Sequelize('your_database_name', 'postgres', '021970', {
  host: 'localhost', // or your database host
  dialect: 'postgres' // or 'mysql', 'sqlite', etc.
});

// Test the database connection
async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectToDatabase();

module.exports = sequelize;