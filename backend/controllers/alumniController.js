// controllers/alumniController.js
const { Alumni, Education, WorkExperience } = require('../models/index');
const { Op } = require('sequelize');

const alumniController = {
  // Get a list of all alumni with filters
  getAlumni: async (req, res) => {
    try {
      const { search, batch, department, location } = req.query;
      const whereClause = {};

      if (search) {
        whereClause[Op.or] = [
          { full_name: { [Op.iLike]: `%${search}%` } },
          { current_company: { [Op.iLike]: `%${search}%` } },
          { location: { [Op.iLike]: `%${search}%` } },
        ];
      }
      if (batch) whereClause.batch_year = batch;
      if (department) whereClause.department = department;
      if (location) whereClause.location = location;

      const alumni = await Alumni.findAll({
        where: whereClause,
        include: [{ model: Education }, { model: WorkExperience }],
      });
      res.json(alumni);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve alumni.' });
    }
  },

  // Get a single alumni profile by ID
  getAlumniProfile: async (req, res) => {
    try {
      const alumni = await Alumni.findByPk(req.params.id, {
        include: [{ model: Education }, { model: WorkExperience }],
      });
      if (!alumni) {
        return res.status(404).json({ error: 'Alumni not found.' });
      }
      res.json(alumni);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve alumni profile.' });
    }
  },
};

module.exports = alumniController;