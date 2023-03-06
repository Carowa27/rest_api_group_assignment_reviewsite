//api/v1/resorts
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const {
  getReviewsFromResort,
  createNewReview,
  deleteReviewById,
} = require("../controllers/reviewController");

router.get("/resorts/:resortId", getReviewsFromResort);

router.post("/", isAuthenticated, createNewReview);

router.delete("/:reviewId", isAuthenticated, deleteReviewById);

module.exports = router;
