const mongoose=require("mongoose");
const postSchema=mongoose.Schema({
    threadId:{type:mongoose.Types.ObjectId,ref:'Thread',required:true},
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    content:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updateAt:{type:Date},
    isDeleted:{type:Boolean,default:false},
    likes:[{type:mongoose.Types.ObjectId,ref:'User'}]
});

module.exports = mongoose.model('Post',postSchema);