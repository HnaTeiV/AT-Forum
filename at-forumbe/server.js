const dotenv = require("dotenv");
dotenv.config();
require("./redisClient.js")
const mongoose = require("mongoose");
const app = require("./app.js"); // ✅ CommonJS require, no "import"

// ENV vars
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;


// ----------------- MongoDB -----------------
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");

    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ----------------- Redis -----------------
