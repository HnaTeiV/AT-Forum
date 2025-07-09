const express= require('express');
const router= express.Router();
const userController=require('../controllers/user.js');
const authMiddleware= require("../middlewares/authMiddleware");
const multer= require('multer');
const path=require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


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

router.put('/updateUser',upload.single("image"),userController.updateUser);
router.post('/login',userController.login);
module.exports=router;
