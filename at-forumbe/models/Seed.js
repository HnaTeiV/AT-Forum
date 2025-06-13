const mongoose = require("mongoose");

// Import your models (adjust the filenames if needed)
const User = require("./User"); // models/User.js
const Category = require("./Category"); // models/Category.js
const Thread = require("./Thread"); // models/Thread.js
const Post = require("./Post"); // models/Post.js

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/AT-Forum", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Thread.deleteMany({}),
      Post.deleteMany({}),
    ]);
    console.log("Cleared old data");

    const users = await User.insertMany([
      {
        username: "user1",
        email: "user1@forum.com",
        passwordHash: "hash1",
        role: "member",
      },
      {
        username: "user2",
        email: "user2@forum.com",
        passwordHash: "hash2",
        role: "member",
      },
      {
        username: "user3",
        email: "user3@forum.com",
        passwordHash: "hash3",
        role: "member",
      },
      {
        username: "user4",
        email: "user4@forum.com",
        passwordHash: "hash4",
        role: "member",
      },
      {
        username: "user5",
        email: "user5@forum.com",
        passwordHash: "hash5",
        role: "member",
      },
      {
        username: "user6",
        email: "user6@forum.com",
        passwordHash: "hash6",
        role: "member",
      },
      {
        username: "user7",
        email: "user7@forum.com",
        passwordHash: "hash7",
        role: "member",
      },
      {
        username: "user8",
        email: "user8@forum.com",
        passwordHash: "hash8",
        role: "member",
      },
      {
        username: "user9",
        email: "user9@forum.com",
        passwordHash: "hash9",
        role: "member",
      },
      {
        username: "user10",
        email: "user10@forum.com",
        passwordHash: "hash10",
        role: "member",
      },
    ]);

    const categories = await Category.insertMany([
      { name: "Search Engines", description: "Search platforms", sortOrder: 1 },
      {
        name: "Video Platforms",
        description: "Video streaming websites",
        sortOrder: 2,
      },
      { name: "Social Media", description: "Social networks", sortOrder: 3 },
      { name: "Information", description: "Knowledge and facts", sortOrder: 4 },
      {
        name: "E-commerce",
        description: "Online shopping platforms",
        sortOrder: 5,
      },
    ]);
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat.name] = cat._id;
    });
    // Create Threads - top 10 websites with valid `owner`
    const threads = await Thread.insertMany([
      {
        title: "Google",
        description: "The world's most popular search engine.",
        url: "https://www.google.com",
        owner: users[0]._id,
        category: categoryMap["Search Engines"],
        status: "published",
        tags: ["search", "engine"],
      },
      {
        title: "YouTube",
        description: "Watch and upload videos online.",
        url: "https://www.youtube.com",
        owner: users[1]._id,
        category: categoryMap["Video Platforms"],
        status: "published",
        tags: ["video", "entertainment"],
      },
      {
        title: "Facebook",
        description: "Connect with friends and family.",
        url: "https://www.facebook.com",
        owner: users[2]._id,
        category: categoryMap["Social Media"],
        status: "published",
        tags: ["social", "networking"],
      },
      {
        title: "Instagram",
        description: "Photo and video sharing app.",
        url: "https://www.instagram.com",
        owner: users[3]._id,
        category: categoryMap["Social Media"],
        status: "published",
        tags: ["photos", "sharing"],
      },
      {
        title: "Twitter",
        description: "Real-time news and conversations.",
        url: "https://www.twitter.com",
        owner: users[4]._id,
        category: categoryMap["Social Media"],
        status: "published",
        tags: ["news", "tweets"],
      },
      {
        title: "Wikipedia",
        description: "Free online encyclopedia.",
        url: "https://www.wikipedia.org",
        owner: users[5]._id,
        category: categoryMap["Information"],
        status: "published",
        tags: ["education", "facts"],
      },
      {
        title: "Amazon",
        description: "Online marketplace for everything.",
        url: "https://www.amazon.com",
        owner: users[6]._id,
        category: categoryMap["E-commerce"],
        status: "published",
        tags: ["shopping", "store"],
      },
      {
        title: "Yahoo",
        description: "News, email, and more.",
        url: "https://www.yahoo.com",
        owner: users[7]._id,
        category: categoryMap["Information"],
        status: "published",
        tags: ["portal", "email"],
      },
      {
        title: "TikTok",
        description: "Short-form mobile videos.",
        url: "https://www.tiktok.com",
        owner: users[8]._id,
        category: categoryMap["Video Platforms"],
        status: "published",
        tags: ["shorts", "viral"],
      },
      {
        title: "Baidu",
        description: "Top Chinese search engine.",
        url: "https://www.baidu.com",
        owner: users[9]._id,
        category: categoryMap["Search Engines"],
        status: "published",
        tags: ["search", "china"],
      },
    ]);

    const postSchema = new mongoose.Schema({
      thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true,
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }, // <-- Required
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      editAt: { type: Date },
      isDeleted: { type: Boolean, default: false },
      likes:{type:Int16Array,default:0}
    });

    console.log("✅ Sample data inserted successfully!");

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed();
}

module.exports = seed;
