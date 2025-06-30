const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    content:{type:String,requried:true},
    commentedAt:{type:Date,default:Date.now},
    editedAt:{type:Date},
    likes: { type: Number, default: 0 }
});
module.exports = mongoose.model('Comment',commentSchema);