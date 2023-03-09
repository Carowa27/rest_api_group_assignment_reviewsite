const { userRoles, listRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { QueryTypes } = require("sequelize");
const {
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} = require("../utils/errorHandling");

exports.getReviewsFromResort = async (req, res) => {
  const resortId = req.params.resortId;

  const [results] = await sequelize.query(
    `
      SELECT reviews.id AS reviewId, review_description, review_rating, user_id, users.username, reviews.resort_id, owner_id, resorts.resort_name FROM reviews
      LEFT JOIN resorts ON resorts.id = resort_id
      LEFT JOIN users ON users.id = user_id
      WHERE resort_id = $resortId;
      `,
    {
      bind: { resortId: resortId },
    }
  );
  if (!results || results.length == 0) {
    throw new NotFoundError("did not find reviews for that resort");
  }

  const resortResponse = {
    resortId: resortId,
    resortName: results[0].resort_name,
    reviews: results.map((reviews) => {
      return {
        details: reviews.review_description,
        rating: reviews.review_rating,
        writer: reviews.user_id,
      };
    }),
  };

  return res.json(resortResponse);
};

exports.createNewReview = async (req, res) => {
  if (req.user.role == userRoles.ADMIN || userRoles.USER) {
    const { review_description, review_rating, resort_id } = req.body;
    const activeUserId = req.user.userId;
    await sequelize.query(
      "INSERT INTO reviews (review_description, review_rating, resort_id, user_id) VALUES ($review_description, $review_rating, (SELECT id FROM resorts WHERE id=$resort_id), (SELECT id FROM users WHERE id=$activeUserId))",
      {
        bind: {
          review_description: review_description,
          review_rating: review_rating,
          resort_id: resort_id,
          activeUserId: activeUserId,
        },
        type: QueryTypes.INSERT,
      }
    );
    return res.status(200).json({
      message: "new review registered",
    });
  } else {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
exports.deleteReviewById = async (req, res) => {
  const activeUserId = req.user.userId;
  const reviewId = req.params.reviewId;

  const [review] = await sequelize.query(
    `SELECT * FROM reviews WHERE id= $reviewId;`,
    {
      bind: {
        reviewId: req.params.reviewId,
      },
      type: QueryTypes.SELECT,
    }
  );

  if (review.length == 0) {
    throw new BadRequestError("That review does not exists");
  }

  const writerId = review[0].user_id;

  if (req.user.role == userRoles.ADMIN || activeUserId == writerId) {
    await sequelize.query(`DELETE FROM reviews WHERE id = $reviewId;`, {
      bind: { reviewId: reviewId },
    });
    return res.sendStatus(204);
  } else {
    throw new UnauthorizedError("This review is not yours to delete");
  }
};
