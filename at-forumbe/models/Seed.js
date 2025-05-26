const mongoose = require('mongoose');

// Import your models (adjust the filenames if needed)
const User = require('./User');       // models/User.js
const Category = require('./Category'); // models/Category.js
const Thread = require('./Thread');   // models/Thread.js
const Post = require('./Post');       // models/Post.js

async function seed() {
  try {
    await mongoose.connect('mongodb://localhost:27017/AT-Forum', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing collections
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Thread.deleteMany({}),
      Post.deleteMany({})
    ]);
    console.log('Cleared old data');

    // Insert sample users
    const users = await User.insertMany([
      { username: "admin", email: "admin@forum.com", passwordHash: "adminhash", role: "admin", createdAt: new Date() },
      { username: "alice", email: "alice@forum.com", passwordHash: "hash1", role: "member", createdAt: new Date() },
      { username: "bob", email: "bob@forum.com", passwordHash: "hash2", role: "member", createdAt: new Date() },
      { username: "charlie", email: "charlie@forum.com", passwordHash: "hash3", role: "member", createdAt: new Date() },
      { username: "mod", email: "mod@forum.com", passwordHash: "modhash", role: "moderator", createdAt: new Date() }
    ]);

    // Insert sample categories
    const categories = await Category.insertMany([
      { name: "General", description: "General discussion", sortOrder: 1 },
      { name: "Feedback", description: "Site feedback", sortOrder: 2 }
    ]);

    // Insert sample threads
    const threads = await Thread.insertMany([
      {
        title: "Welcome to the forum!",
        categoryId: categories[0]._id,
        userId: users[0]._id,
        createAt: new Date(),
        isLocked: false,
        isSticky: true
      },
      {
        title: "Site Suggestions",
        categoryId: categories[1]._id,
        userId: users[1]._id,
        createAt: new Date(),
        isLocked: false,
        isSticky: false
      }
    ]);

    // Insert sample posts
    await Post.insertMany([
      {
        threadId: threads[0]._id,
        userId: users[1]._id,
        content: "Hi everyone, I'm Alice!",
        createdAt: new Date(),
        isDeleted: false
      },
      {
        threadId: threads[0]._id,
        userId: users[2]._id,
        content: "Welcome Alice!",
        createdAt: new Date(),
        isDeleted: false
      },
      {
        threadId: threads[1]._id,
        userId: users[1]._id,
        content: "Can we add dark mode?",
        createdAt: new Date(),
        isDeleted: false
      }
    ]);

    console.log('✅ Sample data inserted successfully!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed();
}

module.exports = seed;
