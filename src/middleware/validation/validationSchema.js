const { body } = require("express-validator");

exports.registerSchema = [
  body("email").isEmail().withMessage("You must provide a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage(
      "You must provide a password that is at least 6 characters long"
    ),
  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 20 })
    .withMessage(
      "Sorry, your user username must be between 3 and 20 characters long."
    ),
];

exports.loginSchema = [
  body("username").isString().withMessage("You must provide a valid username"),
  body("password").not().isEmpty().withMessage("You must provide a password"),
];
