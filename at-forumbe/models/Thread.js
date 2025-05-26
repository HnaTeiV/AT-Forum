const mongoose=require("mongoose");
const threadSchema= mongoose.Schema({
    title:{type:String,requried:true},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:'Category',required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    createAt:{type:Date,default:Date.now},
    updateAt:{type:Date},
    isLocked:{type:Boolean,default:false},
    isSticky:{type:Boolean,default:false},
});
module.exports = mongoose.model('Thread',threadSchema);