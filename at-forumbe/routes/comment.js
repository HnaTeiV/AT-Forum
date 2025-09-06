const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment");
const multer = require("multer");
const path = require("path");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

// Filter only images/videos
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos allowed."), false);
  }
};

// ⚡ No file size limit → stream directly to disk
const upload = multer({ storage, fileFilter });

router.post(
  "/",
  (req, res, next) => {
    upload.array("files", 10)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next(); // continue to controller
    });
  },
  commentController.createComment
);
router.get("/:id/hotestComments",commentController.get10HotestComments);
router.get("/:id",commentController.get10NewestComments);
module.exports = router;
