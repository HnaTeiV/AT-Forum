const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
    threadId:{type:mongoose.Schema.Types.ObjectId,ref:'Thread',required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    content:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    editedAt:{type:Date},
    isDeleted: { type: Boolean, default: false },
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post',postSchema);