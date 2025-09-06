const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
    threadId:{type:mongoose.Schema.Types.ObjectId,ref:'Thread',required:true},
    author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true},
    contents:[
        {
            type:{type:String,enum:['text','image','video','link'],required:true},
            value:{type:String,required:true}
    
}],
    likes:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now},
    editedAt:{type:Date},
    isDeleted: { type: Boolean, default: false },
    views:{type:Number,default:0},
});

postSchema.methods.addContent = function(type, value) {
    if(!['text', 'image', 'video', 'link'].includes(type)) {
        throw new Error('Invalid content type');
    }
    this.contents.push({ type, value });
    return this;
}
postSchema.statics.createPost= async function(threadId, author, title, contents) {
    const post= new this({threadId: threadId, author, title, contents: [], createdAt: new Date(), editedAt: null, isDeleted: false, likes: 0, views: 0});
    contents.forEach(c=> post.addContent(c.type, c.value));
    await post.save();
    return post;
}

module.exports = mongoose.model('Post', postSchema);