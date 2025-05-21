const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());             // Allow cross-origin requests
app.use(express.json());     // Parse JSON request bodies

// Sample health check route
app.get('/', (req, res) => {
  res.send('Forum API is running...');
});

// Import and use route files
// const postRoutes = require('./routes/posts');
// app.use('/api/posts', postRoutes);

module.exports = app;