const express= require('express');
const router= express.Router();
const userController=require('../controllers/user.js');
const {authMiddleware,requireRole}= require("../middlewares/authMiddleware");
const multer= require('multer');
const path=require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });


router.get('/',userController.getAllUsers);
router.get('/profile',authMiddleware,userController.getProfileUser
)
router.get('/:username',userController.getUserByUserName);
router.get('/:userId/likes',authMiddleware,userController.getUserLikes);
router.post('/',userController.addUser);
router.delete('/deleteUser/:id',userController.deleteUser);

router.put('/updateUser', authMiddleware, requireRole("admin", "moderator"),upload.single("image"),userController.updateUser);
router.post('/login',userController.login);
module.exports=router;
