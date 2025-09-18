// server.js
const express = require('express');
const { sequelize } = require('./models/index');
const authRoutes = require('./routes/authRoutes');
const alumniRoutes = require('./routes/alumniRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Allows the app to parse JSON bodies

// API Routes
app.use('/api/auth', authRoutes); // All routes in authRoutes.js will be prefixed with /api/auth
app.use('/api/alumni', alumniRoutes); // All routes in alumniRoutes.js will be prefixed with /api/alumni

// Database Synchronization and Server Start
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database and tables created/updated successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to sync database:', err);
  });