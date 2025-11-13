const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();

// Get all public habits (for home page)
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

// Get all public habits for browsing
router.get('/browse', async (req, res) => {
  try {
    const habits = await Habit.find({ isPublic: true })
      .sort({ createdAt: -1 });
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

// Get habit by ID
router.get('/:id', async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update habit
router.put('/:id', async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(habit);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete habit
router.delete('/:id', async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;