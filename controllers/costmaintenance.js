// routes/maintenanceCosts.js
const express = require('express');
const router = express.Router();
const MaintenanceCost = require('../models/MaintenanceCost');

// Create a maintenance cost record
router.post('/', async (req, res) => {
  try {
    const { maintenanceType, cost, date, propertyId } = req.body;
    const maintenanceCost = new MaintenanceCost({ maintenanceType, cost, date, property: propertyId });
    await maintenanceCost.save();
    res.json(maintenanceCost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for listing and managing maintenance costs.
