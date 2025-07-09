const mongoose= require('mongoose');
const userSchema=new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    username:{type:String,require:true,unique:true},
    image:{type:String},
    email:{type:String,required:true,unique:true},
    passwordHash:{type:String,required:true},
    role:{type:String,enum:['admin','moderator','member'],default:'member'},
    isBanned:{type:Boolean,default:false},
    createdAt:{type:Date,default:Date.now},
    lastLogin:{type:Date},
    
});
module.exports=mongoose.model('User',userSchema);