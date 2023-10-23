// routes/workOrders.js
const express = require('express');
const router = express.Router();
const WorkOrder = require('../models/WorkOrder');
const MaterialRequest = require('../models/MaterialRequest');

// Create a work order based on an approved request
router.post('/', async (req, res) => {
  try {
    const { requestId, assignedTo } = req.body; // Assuming you pass the request ID and assigned personnel
    const materialRequest = await MaterialRequest.findById(requestId);
    if (!materialRequest || materialRequest.status !== 'Approved') {
      return res.status(400).json({ message: 'Invalid or unapproved request' });
    }
    const workOrder = new WorkOrder({ request: requestId, assignedTo });
    await workOrder.save();
    res.json(workOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement other routes for listing, updating, and managing work orders.
