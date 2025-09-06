const Post = require('../models/Post');
const User = require('../models/User');
async function getAllPostsById(id) {
  try {
    return await Post.find({threadId:id ,isDeleted: false })
      .populate('author')    // populate user info (only username)
      .populate('threadId')              // populate thread info if needed
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
async function viewPost(id) {
  try {
    return await Post.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
  } catch (error) {
    console.error("Error incrementing view count:", error);
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

async function addPost({ threadId, author, title, contents }) {
  try {
    const auth= await User.findOne({ username: author });

    if (!author) {
      throw new Error("Author not found");
    }
    const newPost = await Post.createPost(threadId, auth._id, title, contents);
    console.log("New post created:", newPost);

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
        likes: post.likes || 0,
      },
      { new: true }
    ).then((updatedPost) => {
      if (updatedPost) {
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
  getAllPostsById,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  viewPost,
};
