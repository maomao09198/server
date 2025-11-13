const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Morning', 'Work', 'Fitness', 'Evening', 'Study'],
    required: true
  },
  reminderTime: String,
  image: String,
  userEmail: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  completionHistory: [{
    date: String,
    timestamp: Date
  }],
  currentStreak: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Habit', habitSchema);