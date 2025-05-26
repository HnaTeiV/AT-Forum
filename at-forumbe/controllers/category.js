const categoryService = require('../services/categoryService');

async function getAllCategories(req, res) {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}


async function getCategoryByName(req, res) {
  try {
    const category = await categoryService.getCategoryByName(req.params.name);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

async function addCategory(req, res) {
  try {
    const created = await categoryService.addCategory(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add category' });
  }
}


async function updateCategoryByName(req, res) {
  try {
    const result = await categoryService.updateCategoryByName(req.body);
    if (result === "Category Not Found") {
      return res.status(404).json({ message: result });
    }
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update category' });
  }
}

async function deleteCategory(req, res) {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
  updateCategoryByName,
  deleteCategory,
};
