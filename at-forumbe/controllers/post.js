const postService = require('../services/postService');

async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

async function getPostById(req, res) {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
}

async function addPost(req, res) {
  try {
    const created = await postService.addPost(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add post' });
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
    res.status(400).json({ error: 'Failed to update post' });
  }
}

async function deletePost(req, res) {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully (soft delete)' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
