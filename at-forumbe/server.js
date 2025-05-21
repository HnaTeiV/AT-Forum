require('dotenv').config();       // Load .env variables

const mongoose = require('mongoose'); // MongoDB ORM
const app = require('./app');         // Import Express app

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });