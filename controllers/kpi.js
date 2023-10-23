// routes/kpis.js
const express = require('express');
import  KPI from '../models/request'
//create kpi
router.post('/', async (req, res) => {
  try {
    const { name, description, target, currentValue } = req.body;
    const owner = req.user; // Assuming you have user authentication in place
    const kpi = new KPI({ name, description, target, currentValue, owner });
    await kpi.save();
    res.json(kpi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for viewing, updating, and managing KPIs.
