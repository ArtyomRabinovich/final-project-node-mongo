const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/catController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/", authenticateToken, categoryController.createCategory);

router.get("/", authenticateToken, categoryController.getCategories);

router.get(
  "/:categoryId",
  authenticateToken,
  categoryController.getCategoryById
);

router.patch(
  "/:categoryId",
  authenticateToken,
  categoryController.updateCategory
);

router.delete(
  "/:categoryId",
  authenticateToken,
  categoryController.deleteCategory
);

module.exports = router;
