const express= require('express');
const router= express.Router();
const userController=require('../controllers/user.js');
const authMiddleware= require("../middlewares/authMiddleware");
router.get('/',userController.getAllUsers);
router.get('/profile',authMiddleware,userController.getProfileUser
    //(req,res)=>{
//     console.log("✅ /profile route hit!");
//     console.log("req.user:", req.user)
//     return res.json({ message: `Welcome ${req.user.username}!`, user: req.user });}
)
router.get('/:username',userController.getUserByUserName);

router.post('/',userController.addUser);
router.delete('/',userController.deleteUser);
router.put('/updateUser',userController.updateUser);
router.post('/login',userController.login);
module.exports=router;
