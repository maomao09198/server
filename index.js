const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route - NO DATABASE
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Simple habits route without database
app.get('/api/habits/browse', (req, res) => {
  res.json([
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
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

module.exports = app;