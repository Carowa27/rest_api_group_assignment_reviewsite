//api/v1/users
const express = require("express");
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const router = express.Router();
const {
  updateUserById,
  deleteUserById,
  createUser,
} = require("../controllers/userController");

router.put("/:userId", isAuthenticated, updateUserById);

router.delete("/:userId", isAuthenticated, deleteUserById);

module.exports = router;
