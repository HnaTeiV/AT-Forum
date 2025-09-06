const userService = require("../services/userService");
const generateToken = require("../utils/generateToken");
const LikePost = require("../models/LikePost");
const redis = require("../redisClient");
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getUserByUserName(req, res) {
  try {
    const user = await userService.getUserByUserName(req.params.user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function addUser(req, res) {
  try {
    const message = await userService.addUser(req.body);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    console.log("ID received for deletion:", id);
    const message = await userService.deleteUser(id);
    if (message === "User not found") {
      return res.status(404).json({ error: message });
    }
    res.status(200).json({ message });
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getUserLikes(req, res) {
  try {
      const { userId } = req.params;
    // 1️⃣ Try to get liked posts from Redis (full set)
    let ids = await redis.sMembers(`user:${userId}:likedPosts`);

    // 2️⃣ If Redis empty, fallback to Mongo
    if (!ids || ids.length === 0) {
      const baseDocs = await LikePost.find({ userId })
        .select("postId -_id")
        .lean();
      ids = baseDocs.map((d) => String(d.postId));
    }

    // 3️⃣ Return empty array if no likes
    if (ids.length === 0) {
      return res.status(200).json({ likedPosts: [] });
    }

    // 4️⃣ Return full posts if requested, otherwise just IDs
    if (req.query.full === "true") {
      const posts = await Post.find({ _id: { $in: ids } }).lean();
      return res.status(200).json( posts );
    }
    return res.status(200).json( ids );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const userData = {
      ...req.body,
      image: req.file?.filename || null,
    };
    console.log("User data received for update:", userData);
    const data = await userService.updateUser(userData);
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    if (!result.success) {
      return res.status(400).json({ error: result.message }); // return here!
    }

    const token = generateToken(result.user);
    return res.status(200).json({
      result: { user: result.user },
      token,
      message: "Login success",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
async function getProfileUser(req, res) {
  try {
    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await userService.getProfileUser(user);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: `Welcome ${result.username}!`,
      user: result,
    });
  } catch (error) {
    console.error("Error in getProfileUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getAllUsers,
  getUserByUserName,
  addUser,
  deleteUser,
  updateUser,
  login,
  getProfileUser,
  getUserLikes,
};
