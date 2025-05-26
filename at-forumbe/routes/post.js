const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.addPost);
router.put('/', postController.updatePost);  // update expects full post in body including _id
router.delete('/:id', postController.deletePost);

module.exports = router;
