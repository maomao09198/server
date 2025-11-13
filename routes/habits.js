const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();

// Get all public habits
router.get('/public', async (req, res) => {
  try {
    const habits = await Habit.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new habit
router.post('/', async (req, res) => {
  try {
    const habit = new Habit(req.body);
    await habit.save();
    res.status(201).json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's habits
router.get('/user/:email', async (req, res) => {
  try {
    const habits = await Habit.find({ userEmail: req.params.email });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;