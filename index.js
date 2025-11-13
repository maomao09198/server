const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.log('❌ MongoDB connection failed:', err.message);
  });

// Routes
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    message: 'Habit Tracker Server is running!',
    database: dbStatus
  });
});

// Test database connection
app.get('/test-db', (req, res) => {
  if (mongoose.connection.readyState === 1) {
    res.json({ message: '✅ Database connected!' });
  } else {
    res.status(500).json({ error: '❌ Database not connected' });
  }
});

// Simple habits route (will connect to real DB soon)
app.get('/api/habits/browse', (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json([
      {
        _id: '1',
        title: 'Morning Meditation',
        description: 'Start your day with 10 minutes of meditation',
        category: 'Morning',
        userName: 'Test User',
        currentStreak: 5,
        completionHistory: [],
        isPublic: true
      }
    ]);
  }
  
  // TODO: Add real database call here
  res.json({ message: 'Database connected - ready for real data!' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;