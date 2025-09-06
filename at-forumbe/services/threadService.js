const Thread = require("../models/Thread");
const User = require("../models/User");
async function getAllThreads() {
  try {
    return await Thread.find()
      .populate("category", "name") // <-- correct field
      .populate("owner", "username") // <-- correct field
      .sort({ createdAt: -1 });
  } catch (error) {
    console.error("Error fetching threads:", error);
    throw error;
  }
}
async function viewThread(threadId) {
  try {
    return await Thread.findByIdAndUpdate(
      threadId,
      { $inc: { views: 1 } },
      { new: true } 
    );
  } catch (error) {
    console.error("Error viewing thread:", error);
    throw error;
  }
}
async function getThreadByKeyword(keyword) {
  try {
    const thread = await Thread.findOne({title:keyword});
    return thread;
  } catch (error) {
    console.error("Error fetching thread by keyword:", error);
    throw error;
  }
}

async function addThread(thread) {
  try {
    if (!thread.owner) {
      throw new Error("Thread owner is undefined");
    }

    const user = await User.findOne({ username: thread.owner });
    if (!user) {
      throw new Error(`User not found with username: ${thread.owner}`);
    } else {
      const newThread = new Thread({
        title: thread.title,
        description: thread.description,
        url: thread.url,
        owner: user._id,
        category: thread.category,
        status: thread.status || "drafted",
        image: thread.image || "",
        tags: thread.tags || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await newThread.save();
      return "Thread created successfully";
    }
  } catch (error) {
    console.error("Error adding thread:", error);
    throw error;
  }
}

async function updateThread(thread) {
  try {
    if (!thread) {
      throw new Error("Thread is undefined");
    }
    if (!thread.owner) {
      throw new Error("Thread owner is undefined");
    }

    const user = await User.findOne({ _id: thread.owner });
    if (!user) {
      throw new Error(`User not found with username: ${thread.owner}`);
    } else {
      const result= await Thread.findOneAndUpdate(
         { title: thread.title },
        {
          title: thread.title,
          description: thread.description,
          url: thread.url,
          owner: user._id,
          category: thread.category,
          status: thread.status || "drafted",
          image: thread.image || "",
          tags: thread.tags || [],
          updatedAt: new Date(),
        },
        { new: true }
      );
      if (!result) {
        return "Thread Not Found";
      }
      return "Updated thread successfully";
    }
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
//new
async function getTopThreads() {
  try {
    return await Thread.find()
      .sort({ views: -1 }) // sắp xếp theo lượt xem giảm dần
      .limit(4)
      .populate("category", "name")
      .populate("owner", "username");
  } catch (error) {
    console.error("Error fetching top threads:", error);
    throw error;
  }
}

module.exports = {
  getAllThreads,
  getThreadByKeyword,
  addThread,
  updateThread,
  deleteThread,
  getTopThreads,
  viewThread,
};
