const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://majestic-maamoul-6769fc.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://rojakorim42_db_user:0JZXADjEvLhbPs8o@cluster0.wfyz8ky.mongodb.net/habittracker?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Habit Tracker Server is running!' });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Import and use habit routes
const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;