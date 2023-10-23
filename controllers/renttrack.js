// routes/rentCharges.js
const express = require('express');
const router = express.Router();
const RentCharge = require('../models/RentCharge');

// Create a rent or service charge record
router.post('/', async (req, res) => {
  try {
    const { tenantId, amount, dueDate } = req.body;
    const tenant = req.user; // Assuming you have user authentication in place
    const rentCharge = new RentCharge({ tenant: tenantId, amount, dueDate });
    await rentCharge.save();
    res.json(rentCharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for listing, updating, and deleting rent and service charge records.

const schedule = require('node-schedule');
const nodemailer = require('nodemailer'); // Assuming you're using email for notifications

// Schedule notifications for rent and service charges
function scheduleNotifications(rentCharges) {
  rentCharges.forEach((charge) => {
    const dueDate = new Date(charge.dueDate);
    const job = schedule.scheduleJob(dueDate, () => {
      sendNotification(charge);
    });
  });
}

// Send a notification (e.g., via email)
function sendNotification(charge) {
  const transporter = nodemailer.createTransport({
    service: 'your-email-service',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: charge.tenant.email, // Assuming you have the tenant's email
    subject: 'Rent/Service Charge Due',
    text: `Dear ${charge.tenant.name}, your rent or service charge of $${charge.amount} is due on ${charge.dueDate}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    }
  });
}

// Inside your route for creating rent or service charge records
router.post('/', async (req, res) => {
  try {
    // ... (create rent or service charge record)
    await rentCharge.save();

    // Schedule a notification for the due date
    scheduleNotifications([rentCharge]);

    res.json(rentCharge);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
