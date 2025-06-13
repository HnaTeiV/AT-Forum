const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Name of the website
  description: { type: String }, // Optional description
  url: { type: String }, // e.g., "myforum.com/mysite"
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Creator
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  }, // Website type/category
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Thread", threadSchema);
