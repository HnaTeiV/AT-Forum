const Comment = require("../models/Comment");
const redis = require("../redisClient");
const User = require("../models/User");
async function get10NewestComments(req, res) {
  try {
    const postId = req.params.id;
    // 1. Fetch newest 10 comments with populated author + parentComment
    const top10newestComments = await Comment.find({ postId: postId })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author", "username role avatar") // only pick needed fields
      .populate("parentCommentId", "author contents"); // if you want parent reference

    if (!top10newestComments || top10newestComments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }

    // 2. Redis key
    const redisKey = `post:${postId}:comments:newest`;

    // 3. Clear old cache
    await redis.del(redisKey);

    // 4. Store in Redis (sorted set)
    for (const comment of top10newestComments) {
      const score = new Date(comment.createdAt).getTime();
      await redis.zAdd(redisKey, {
        score,
        value: JSON.stringify(comment),
      });
    }

    // 5. Return to client
    return res
      .status(200)
      .json({ comments: top10newestComments, loading: true });
  } catch (error) {
    console.error("Error in get10NewestComments:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function get10HotestComments(req, res) {
  try {
    const postId = req.params.id;

    // Query top 10 by likes
    const top10HotestComments = await Comment.find({ postId })
      .sort({ likes: -1 })
      .limit(10)
      .populate("author", "username role avatar")
      .populate("parentCommentId", "author contents");

    if (!top10HotestComments || top10HotestComments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }

    // Redis cache
    const redisKey = `post:${postId}:comments:hotest`;
    const redisPayload = top10HotestComments.map((c) => ({
      score: c.likes || 0, // use likes as score
      value: JSON.stringify(c), // must be string
    }));

    await redis.zAdd(redisKey, redisPayload);

    return res.status(200).json({ comments: top10HotestComments });
  } catch (error) {
    console.error("Error in get10HotestComments:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createComment(req, res) {
  try {
    const { postId, username, content, parentCommentId } = req.body;
    const files = req.files;

    const contents = [];

    // Text content
    if (content?.trim()) {
      contents.push({ type: "text", value: content.trim() });
    }
    // File content
    if (files && files.length > 0) {
      for (const file of files) {
        const fileType = file.mimetype.startsWith("image/")
          ? "image"
          : file.mimetype.startsWith("video/")
          ? "video"
          : "file";

        contents.push({
          type: fileType,
          value: file.path,
        });
      }
    }

    if (contents.length === 0) {
      return res.status(400).json({ message: "Contents is empty" });
    }

    // Validate user
    const user = await User.findOne({ username }).select("_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save comment in MongoDB
    const result = await Comment.create({
      postId,
      author: user._id,
      parentCommentId,
      contents,
    });

    if (!result) {
      return res.status(400).json({ message: "Can't create a new comment" });
    }

    // Save in Redis (sorted set by createdAt)
    const redisKey = `post:${postId}:comments`;
    await redis.zAdd(redisKey, {
      score: Date.now(),
      value: JSON.stringify(result),
    });

    res
      .status(200)
      .json({ comment: result, message: "Create new comment success" });
  } catch (error) {
    console.error("Internal error:", error);
    res.status(500).json({ message: "Error in internal" });
  }
}

module.exports = { get10NewestComments, get10HotestComments, createComment };
