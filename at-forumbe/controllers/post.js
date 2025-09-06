const postService = require("../services/postService");
const redis = require("../redisClient");
const User = require("../models/User");
const cron = require("node-cron");
const Post = require("../models/Post");
const LikePost = require("../models/LikePost");
async function getAllPostsById(req, res) {
  try {
    const posts = await postService.getAllPostsById(req.params.id);
    // If you want to populate posts, do it properly here or remove this line if not needed
    // Example: await Promise.all(posts.map(post => post.populate('pathseco')));
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post == []) {
      return res.status(404).json({ message: "No Posts" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

async function addPost(req, res) {
  try {
    const { threadId, author, title, content } = req.body;
    const files = req.files; // multer puts uploaded files here

    const contents = [];

    // Add text content if provided
    if (content?.trim()) {
      contents.push({ type: "text", value: content.trim() });
    }

    // Add uploaded files
    if (files && files.length > 0) {
      for (let file of files) {
        const fileType = file.mimetype.startsWith("image/")
          ? "image"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "file";

        contents.push({
          type: fileType,
          value: file.path, // or URL if you serve files statically
        });
      }
    }

    console.log("Contents to be added:", contents);
    const created = await postService.addPost({
      threadId,
      author,
      title,
      contents,
    });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: "Failed to add post" });
  }
}

async function viewPost(req, res) {
  try {
    const { postId } = req.params;
    const newViewCount = await postService.viewPost(postId);
    if (!newViewCount) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(400).json({ message: "Increment views success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
// controllers/likeController.js
const toggleLike = async (req, res) => {
  const { postId, username } = req.body;

  try {
    // 1. Get user
    const user = await User.findOne({ username }).select("_id");
    if (!user) return res.status(404).json({ message: "User not found" });

    const userId = user._id.toString();
    const userSetKey = `post:${postId}:likedUsers`;
    const likeCountKey = `post:${postId}:likes`;

    // 2. Check Redis first
    let isLiked = await redis.sIsMember(userSetKey, userId);

    // 3. If Redis doesn’t know, fallback to DB
    if (!isLiked) {
      const dbLike = await LikePost.findOne({ postId, userId });
      if (dbLike) {
        // Lazy sync Redis
        await redis.sAdd(userSetKey, userId);
        await redis.incr(likeCountKey);
        isLiked = true;
      }
    }

    let liked;
    if (isLiked) {
      // 4a. Unlike
      await redis.sRem(userSetKey, userId);
      await redis.decr(likeCountKey);
      await LikePost.deleteOne({ postId, userId });
      liked = false;
    } else {
      // 4b. Like
      await redis.sAdd(userSetKey, userId);
      await redis.incr(likeCountKey);
      await LikePost.create({ postId, userId });
      liked = true;
    }

    // 5. Get latest like count (Redis → fallback Mongo)
    let likeCount = await redis.get(likeCountKey);
    if (!likeCount) {
      likeCount = await LikePost.countDocuments({ postId });
      await redis.set(likeCountKey, likeCount);
    }

    return res.json({
      liked,
      likeCount: parseInt(likeCount, 10),
      message: liked ? "Liked" : "Unliked",
    });
  } catch (err) {
    console.error("Error in toggleLike:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

async function getPostLike(req, res) {
  try {
    const { username, postId } = req.body;
    const userId = await User.findOne({ username }).select("_id");
    const result = await LikePost.findOne({ userId, postId });
    const likeCount = await Post.findOne({ _id: postId }).select("likes");
    const rs = { liked: !!result, likeCount: likeCount.likes || 0 };
    res.status(200).json(rs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch like count" });
  }
}
async function updatePost(req, res) {
  try {
    const post = req.body;
    const result = await postService.updatePost(post);
    if (result === "Post Not Found") {
      return res.status(404).json({ message: result });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: "Failed to update post" });
  }
}

async function deletePost(req, res) {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ message: "Post deleted successfully (soft delete)" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}
async function syncLikesFromRedisToMongo() {
  try {
    // 1. Sync post like counts
    const postLikeKeys = await redis.keys("post:*:likes");

    // 2. Sync user liked posts
    const userLikedKeys = await redis.keys("user:*:likedPosts");

    for (let key of userLikedKeys) {
      const userId = key.split(":")[1];
      const likedPostIds = await redis.sMembers(key);

      const operations = likedPostIds.map((postId) => ({
        updateOne: {
          filter: { userId, postId },
          update: { $setOnInsert: { userId, postId } },
          upsert: true,
        },
      }));

      if (operations.length > 0) {
        await LikePost.bulkWrite(operations);
      }

      // cleanup Redis
      await redis.del(key);
    }
    for (let key of postLikeKeys) {
      const postId = key.split(":")[1];
      const likeCount = await redis.get(key);

      await Post.findByIdAndUpdate(
        postId,
        { likes: parseInt(likeCount) || 0 },
        { new: true }
      );

      await redis.del(key);
    }

    console.log("✅ Synced likes from Redis to MongoDB and cleaned Redis");
  } catch (err) {
    console.error("❌ Error syncing likes:", err);
  }
}
cron.schedule("*/5 * * * *", () => {
  console.log("⏳ Running syncLikesFromRedisToMongo job...");
  syncLikesFromRedisToMongo();
});
module.exports = {
  getAllPostsById,
  getPostById,
  toggleLike,
  addPost,
  updatePost,
  deletePost,
  viewPost,
  getPostLike,
};
