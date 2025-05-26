const express = require('express');
const cors = require('cors');
const userRoutes= require('./routes/user');
const categoryRoutes=require('./routes/category');
const threadRoutes = require('./routes/thread');
const postRoutes=require('./routes/post');
const app = express();

app.use(cors());             // Allow cross-origin requests
app.use(express.json());     // Parse JSON request bodies


//Routes
app.use('/api/user',userRoutes);
app.use('/api/category',categoryRoutes);
app.use('/api/post',postRoutes);

app.use('/api/thread', threadRoutes);

// Sample health check route
app.get('/', (req, res) => {
  res.send('Forum API is running...');
});
app.use('/api/categories', categoryRoutes);
// Import and use route files
// const postRoutes = require('./routes/posts');
// app.use('/api/posts', postRoutes);

module.exports = app;