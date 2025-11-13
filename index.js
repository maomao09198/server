const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware - SIMPLIFIED CORS
app.use(cors({
  origin: '*', // Allow all origins for now
  credentials: true
}));
app.use(express.json());

// MongoDB connection with better error handling
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Attempting MongoDB connection...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log('📊 Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
  console.log('❌ MongoDB connection error:', err.message);
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Habit Tracker Server is running!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route working!',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Test database route
app.get('/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    // Try to list collections to test DB connection
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({ 
      message: 'Database test successful!',
      collections: collections.map(c => c.name)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Import and use habit routes
const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on port: ${port}`);
  console.log(`📡 MongoDB URI: ${MONGODB_URI ? 'Set' : 'Not set'}`);
});

module.exports = app;