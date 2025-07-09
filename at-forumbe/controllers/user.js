const userService = require("../services/userService");
const generateToken = require("../utils/generateToken");
 
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getUserByUserName(req, res) {
  try {
    const user = await userService.getUserByUserName(req.params.user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function addUser(req, res) {
  try {
    const message = await userService.addUser(req.body);
    res.status(200).json({ message });
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteUser(req, res) {
  try {
      const id = req.query.id;
    const message = await userService.deleteUser(id);
     if (message === "User not found") {
      return res.status(404).json({ error: message });
    }
    res.status(200).json({ message });
  } catch (error) {
    console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function updateUser(req,res){
    try{
        const data = await userService.updateUser(req.body);
        res.status(200).json({data});
    }catch(error){
        console.error("Name of error:" + error);
    res.status(500).json({ error: "Internal server error" });
    }
}
async function login(req,res){
  try{
    const {username,password}=req.body;
    const result= await userService.login(username,password);
    if(!result){
      
      res.status(400).json("Something went wrong in Controllers");
    }
    const token=generateToken(result.user);
      return res.status(200).json({result,token});
  }catch(error){
      console.error("Name of error:"+error);
      return res.status(500).json({error:"Internal server error"});
  }
}
async function getProfileUser(req,res){
   try {
    const user = req.user;
    if (!user || !user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const result = await userService.getProfileUser(user);

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: `Welcome ${result.username}!`,
      user: result,
    });
  } catch (error) {
    console.error("Error in getProfileUser:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { getAllUsers, getUserByUserName, addUser,deleteUser,updateUser,login,getProfileUser };
