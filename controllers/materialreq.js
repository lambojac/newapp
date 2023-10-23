
const express = require('express');
import  MaterialRequest from '../models/request'
// Create a new material request
export const materialreq = ( async (req, res) => {
  try {
    const { item, quantity } = req.body;
    const requester = req.user; //  authentication in place
    const materialRequest = new MaterialRequest({ requester, item, quantity });
    await materialRequest.save();
    res.json(materialRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of material requests
export const getmaterial=( async (req, res) => {
  try {
    const requests = await MaterialRequest.find().populate('requester', 'username'); // Populate the requester field with user details
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export const materialreqid=(async (req, res) => {
    try {
      const request = await MaterialRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({ message: 'Request not found' });
      }
      request.status = 'Approved';
      await request.save();
      res.json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
