const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.js');

router.get('/', categoryController.getAllCategories);
router.get('/:name', categoryController.getCategoryByName);

router.post('/', categoryController.addCategory);

router.put('/updateCategory', categoryController.updateCategoryByName);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
