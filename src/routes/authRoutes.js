//api/v1/auth
const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");
const {
  loginSchema,
  registerSchema,
} = require("../middleware/validation/validationSchema");
const { validate } = require("../middleware/validation/validationMiddleware");

//user register
router.post("/register", validate(registerSchema), register);
//user login
router.post("/login", validate(loginSchema), login);

module.exports = router;
