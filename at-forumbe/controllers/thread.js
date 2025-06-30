const threadService = require('../services/threadService');

async function getTopThreads(req, res) { //new  
  try {
    const threads = await threadService.getTopThreads(); // gọi từ service
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top threads' });
  }
}

async function getAllThreads(req, res) {
  try {
    const threads = await threadService.getAllThreads();
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
}

async function getThreadByKeyword(req, res) {
  try {
    const keyword = req.params.keyword;
    console.log(keyword);
    const thread = await threadService.getThreadByKeyword(keyword);
    if (!thread) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.json(thread);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch thread' });
  }
}

async function addThread(req, res) {
  try {
    const created = await threadService.addThread(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add thread' });
  }
}

async function updateThread(req, res) {
  try {
    const thread = req.body;
    const result = await threadService.updateThread(thread);
    if (result === "Thread Not Found") {
      return res.status(404).json({ message: result });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update thread' });
  }
}

async function deleteThread(req, res) {
  try {
    const deleted = await threadService.deleteThread(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Thread not found' });
    }
    res.json({ message: 'Thread deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete thread' });
  }
}

module.exports = {
  getAllThreads,
  getThreadByKeyword,
  addThread,
  updateThread,
  deleteThread,
  getTopThreads,
};
