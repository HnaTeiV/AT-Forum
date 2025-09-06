const mongoose = require('mongoose');

const likePostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    likedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('LikePost', likePostSchema);