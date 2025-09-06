const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const {authMiddleware} = require("../middlewares/authMiddleware");
const multer = require('multer');
const path = require('path');
// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save files (make sure it exists)
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// Optional: filter only images/videos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos allowed."), false);
  }
};
const upload = multer({ storage, fileFilter });

router.get('/:id', postController.getAllPostsById);
router.get('/:id', postController.getPostById);
router.get('/view/:postId', postController.viewPost);
router.post('/toggleLike',authMiddleware,postController.toggleLike);
router.post('/getPostLike',authMiddleware,postController.getPostLike);
router.post('/',upload.array("files", 10), postController.addPost);
router.put('/', postController.updatePost);  // update expects full post in body including _id
router.delete('/:id', postController.deletePost);

module.exports = router;
