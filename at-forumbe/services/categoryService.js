const Category = require('../models/Category');

async function getAllCategories() {
  try {
    return await Category.find().sort({ sortOrder: 1 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}


async function getCategoryByName(name) {
  try {
    return await Category.findOne({ name: name });
  } catch (error) {
    console.error("Error fetching category by name:", error);
    throw error;
  }
}

async function addCategory(data) {
  try {
    const newCategory = new Category({
      name: data.name,
      description: data.description,
      sortOrder: data.sortOrder || 0,
    });
    return await newCategory.save();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}


async function updateCategoryByName(category) {
  try {
    return await Category.findOneAndUpdate(
      { name: category.name },
      {
        name: category.name,
        description: category.description,
        sortOrder: category.sortOrder,
      },
      { new: true }
    ).then((updatedCategory) => {
      if (updatedCategory) {
        console.log("Updated category:", updatedCategory);
        return updatedCategory;
      } else {
        return "Category Not Found";
      }
    });
  } catch (error) {
    console.error("Error updating category by name:", error);
    throw error;
  }
}

async function deleteCategory(id) {
  try {
    const deleted = await Category.findByIdAndDelete(id);
    return deleted;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
  updateCategoryByName,
  deleteCategory,
};
