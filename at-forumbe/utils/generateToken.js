require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET=process.env.JWT_SECRET;

function generateToken(user){
    const payload={
        _id: user._id, role: user.role, username: user.username,
    };
    
    const token=jwt.sign(payload,JWT_SECRET,{expiresIn:"1d"});

    return token;
}
module.exports=generateToken;