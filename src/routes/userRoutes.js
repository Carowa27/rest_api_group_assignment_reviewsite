const express = require("express");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const router = express.Router();
const {
  updateUserById,
  deleteUserById,
} = require("../controllers/userController");

router.put("/:userId", isAuthenticated, updateUserById);

router.delete("/:userId", isAuthenticated, deleteUserById);

module.exports = router;
