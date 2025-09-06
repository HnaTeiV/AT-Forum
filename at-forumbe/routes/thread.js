const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');
const { authMiddleware, requireRole } = require("../middlewares/authMiddleware");
const multer = require("multer");
const path=require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
router.get('/', threadController.getAllThreads);

router.get('/top-threads', threadController.getTopThreads); 
router.get('/view/:threadId', threadController.viewThread); 
router.get('/:keyword', threadController.getThreadByKeyword);
router.delete('/:id', threadController.deleteThread);
router.post('/',authMiddleware, requireRole("admin", "moderator"),upload.single("image"), threadController.addThread);
router.put('/',authMiddleware, requireRole("admin", "moderator"),upload.single("image"), threadController.updateThread);  // expects full thread object with _id in body


module.exports = router;
