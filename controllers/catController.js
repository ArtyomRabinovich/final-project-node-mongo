const Category = require("../models/catModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({
      name,
      description,
    });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error: " + error.message });
    } else if (error.code === 11000) {
      res.status(400).json({ message: "Duplicate category name error." });
    } else {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { name, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation error: " + error.message });
    } else {
      res.status(500).json({ message: "Server error: " + error.message });
    }
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Server error: " + error.message });
  }
};
