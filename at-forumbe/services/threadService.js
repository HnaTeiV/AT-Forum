const Thread = require('../models/Thread');

async function getAllThreads() {
  try {
    return await Thread.find()
      .populate('category', 'name')     // <-- correct field
      .populate('owner', 'username')    // <-- correct field
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching threads:", error);
    throw error;
  }
}

async function getThreadById(id) {
  try {
    return await Thread.findById(id)
      .populate('categoryId', 'name')
      .populate('userId', 'username');
  } catch (error) {
    console.error("Error fetching thread by id:", error);
    throw error;
  }
}

async function addThread(thread) {
  try {
    const newThread = new Thread({
      title: thread.title,
      categoryId: thread.categoryId,
      userId: thread.userId,
      createdAt: new Date(),
      isLocked: thread.isLocked || false,
      isSticky: thread.isSticky || false,
    });
    return await newThread.save();
  } catch (error) {
    console.error("Error adding thread:", error);
    throw error;
  }
}

async function updateThread(thread) {
  try {
    return await Thread.findByIdAndUpdate(
      thread._id,
      {
        title: thread.title,
        categoryId: thread.categoryId,
        userId: thread.userId,
        updateAt: new Date(),
        isLocked: thread.isLocked,
        isSticky: thread.isSticky,
      },
      { new: true }
    ).then(updatedThread => {
      if (updatedThread) {
        console.log("Updated thread:", updatedThread);
        return updatedThread;
      } else {
        return "Thread Not Found";
      }
    });
  } catch (error) {
    console.error("Error updating thread:", error);
    throw error;
  }
}

async function deleteThread(id) {
  try {
    const deleted = await Thread.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.error("Error deleting thread:", error);
    throw error;
  }
}

module.exports = {
  getAllThreads,
  getThreadById,
  addThread,
  updateThread,
  deleteThread,
};
