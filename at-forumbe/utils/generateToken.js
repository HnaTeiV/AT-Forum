require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

function generateToken(user){
    const payload={
        id:user._id,
        username:user.username,
        role:user.role||"member",
    };
    
    const token=jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});
    console.log(token);
    return token;
}
module.exports=generateToken;