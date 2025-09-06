const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    parentCommentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // self-reference for replies
      default: null,
      index: true,
    },
     contents: [
      {
        type: {
          type: String,
          enum: ["text", "image", "video", "link"],
          required: true,
        },
        value: { type: String, required: true },
      },
    ],
    likes: { type: Number, default: 0, index: true },
    replyCount: { type: Number, default: 0 }, // quick access to # of replies
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

// Compound index: fetch comments of a post, by parent, newest first
commentSchema.index({ postId: 1, parentCommentId: 1, createdAt: -1 });

// Useful index: fetch "top comments" of a post by likes
commentSchema.index({ postId: 1, likes: -1 });

module.exports = mongoose.model("Comment", commentSchema);
