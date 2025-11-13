const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Add after middleware
const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Habit Tracker Server is running!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));