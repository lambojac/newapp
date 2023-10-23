// routes/documents.js
const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const DocumentApproval = require('../models/DocumentApproval');

// Create a document
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const owner = req.user; // Assuming you have user authentication in place
    const document = new Document({ name, description, owner });
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an approval request for a document
router.post('/:documentId/approvals', async (req, res) => {
  try {
    const { approverId } = req.body;
    const document = await Document.findById(req.params.documentId);
    if (!document) {
      return res.status(400).json({ message: 'Invalid document ID' });
    }
    const approval = new DocumentApproval({ document: document._id, approver: approverId });
    await approval.save();
    res.json(approval);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for viewing, updating, and managing document approvals.
