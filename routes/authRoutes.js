const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.patch("/:userId", authenticateToken, userController.updateUser);
router.delete("/:userId", authenticateToken, userController.deleteUser);

module.exports = router;
