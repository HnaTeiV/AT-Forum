const mongoose = require('mongoose');
const LikeCommentSchema=new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required
: true },
    commentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
    likedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('LikeComment', LikeCommentSchema);