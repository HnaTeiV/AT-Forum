const Post = require('../models/Post');

async function getAllPosts() {
  try {
    return await Post.find({ isDeleted: false })
      .populate('userId', 'username')    // populate user info (only username)
      .populate('threadId')              // populate thread info if needed
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

async function getPostById(id) {
  try {
    return await Post.findById(id)
      .populate('userId', 'username')
      .populate('threadId');
  } catch (error) {
    console.error("Error fetching post by id:", error);
    throw error;
  }
}

async function addPost(post) {
  try {
    const newPost = new Post({
      threadId: post.threadId,
      author: post.userId,
      content: post.content,
      createdAt: new Date(),
      isDeleted: false,
      likes: 0,
    });
    return await newPost.save();
  } catch (error) {
    console.error("Error adding post:", error);
    throw error;
  }
}

async function updatePost(post) {
  try {
    return await Post.findByIdAndUpdate(
      post._id,
      {
        content: post.content,
        updateAt: new Date(),
        isDeleted: post.isDeleted || false,
        likes: post.likes || 0,
      },
      { new: true }
    ).then((updatedPost) => {
      if (updatedPost) {
        console.log("Updated post:", updatedPost);
        return updatedPost;
      } else {
        return "Post Not Found";
      }
    });
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

async function deletePost(id) {
  try {
    // Soft delete: set isDeleted to true instead of removing from DB
    const deleted = await Post.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    return deleted;
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
