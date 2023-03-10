const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const {
  loginSchema,
  registerSchema,
} = require("../middleware/validation/validationSchema");
const { validate } = require("../middleware/validation/validationMiddleware");

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

module.exports = router;
