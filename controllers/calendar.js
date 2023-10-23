// routes/calendarEvents.js
const express = require('express');
const router = express.Router();
const CalendarEvent = require('../models/CalendarEvent');

// Create a calendar event
router.post('/', async (req, res) => {
  try {
    const { title, description, dateTime } = req.body;
    const user = req.user; // Assuming you have user authentication in place
    const calendarEvent = new CalendarEvent({ title, description, dateTime, user });
    await calendarEvent.save();
    res.json(calendarEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Implement routes for listing, updating, and deleting calendar events.
const schedule = require('node-schedule');

// Schedule a reminder for a calendar event
function scheduleReminder(calendarEvent) {
  const reminderDate = new Date(calendarEvent.dateTime);
  const reminderJob = schedule.scheduleJob(reminderDate, () => {
    // You can send a reminder notification here, e.g., through email or push notification.
    console.log(`Reminder for event: ${calendarEvent.title}`);
  });
}

// Inside your route for creating calendar events
router.post('/', async (req, res) => {
  try {
    // ... (create calendar event)
    await calendarEvent.save();

    // Schedule a reminder for the event
    scheduleReminder(calendarEvent);

    res.json(calendarEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
