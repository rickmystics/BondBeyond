// routes/alumniRoutes.js
const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumniController');

// Route to get a list of all alumni with search/filter options
router.get('/', alumniController.getAlumni);

// Route to get a single alumni profile by ID
router.get('/:id', alumniController.getAlumniProfile);

module.exports = router;