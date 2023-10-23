// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const MaintenanceRequest = require('../models/MaintenanceRequest');

// Create feedback for a maintenance request
router.post('/', async (req, res) => {
  try {
    const { maintenanceRequestId, content } = req.body;
    const tenant = req.user; // Assuming you have user authentication in place
    const maintenanceRequest = await MaintenanceRequest.findById(maintenanceRequestId);

    if (!maintenanceRequest || maintenanceRequest.status !== 'Completed') {
      return res.status(400).json({ message: 'Invalid or uncompleted maintenance request' });
    }

    const feedback = new Feedback({ maintenanceRequest: maintenanceRequestId, tenant, content });
    await feedback.save();
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for listing, updating, and managing feedback.
