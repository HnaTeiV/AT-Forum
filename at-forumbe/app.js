const express = require("express");
const cors = require("cors");
const path = require("path");

// --- Routes ---
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const threadRoutes = require("./routes/thread");
const commentRoutes = require("./routes/comment");
const postRoutes = require("./routes/post");

const app = express();

// --- CORS ---
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  })
);

// --- Helper to skip multipart for JSON/urlencoded parsers ---
function skipMultipart(middleware) {
  return (req, res, next) => {
    const contentType = req.headers["content-type"] || "";
    if (contentType.includes("multipart/form-data")) {
      return next(); // let Multer handle it
    }
    return middleware(req, res, next);
  };
}

// --- Apply body parsers (skip multipart/form-data) ---
app.use(skipMultipart(express.json({ limit: "1mb" }))); 
app.use(skipMultipart(express.urlencoded({ extended: true, limit: "1mb" })));

// --- Static files ---
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
app.use("/api/comment", commentRoutes); // has Multer inside
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/post", postRoutes);
app.use("/api/thread", threadRoutes);

// --- Health check ---
app.get("/", (req, res) => {
  res.send("Forum API is running...");
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

module.exports = app;
