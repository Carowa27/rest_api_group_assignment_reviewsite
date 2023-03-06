//api/v1/resorts
const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/authenticationMiddleware");
const {
  getReviewsFromResort,
  createNewReview,
  deleteReviewById,
} = require("../controllers/reviewController");

router.get("/resorts/:resortId", getReviewsFromResort); //??

//post om auth ->review
router.post("/", isAuthenticated, createNewReview);
//delete om auth om admin -> review by id
router.delete("/:reviewId", isAuthenticated, deleteReviewById); //lägga till om admin true, authorizeRoles?

module.exports = router;
