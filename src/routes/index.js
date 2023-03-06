const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const resortRoutes = require("./resortRoutes");
const reviewRoutes = require("./reviewRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/resorts", resortRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
