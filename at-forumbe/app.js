const express = require('express');
const cors = require('cors');
const userRoutes= require('./routes/user');
const categoryRoutes=require('./routes/category');
const threadRoutes = require('./routes/thread');
const postRoutes=require('./routes/post');
const path=require('path');
const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"]
}));   // Allow cross-origin requests
app.use(express.json());     // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log("=== HEADERS ===");
//   console.log(req.headers);
//   // console.log("Authorization header:", req.headers.authorization);
//   next();
// });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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

module.exports = app;