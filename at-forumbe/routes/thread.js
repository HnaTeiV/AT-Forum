const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread');

router.get('/', threadController.getAllThreads);
router.get('/:id', threadController.getThreadById);
router.post('/', threadController.addThread);
router.put('/', threadController.updateThread);  // expects full thread object with _id in body
router.delete('/:id', threadController.deleteThread);

module.exports = router;
