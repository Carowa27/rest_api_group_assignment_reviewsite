const { QueryTypes } = require("sequelize");
const { userRoles, listRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errorHandling");

exports.getReviewsFromResort = async (req, res) => {
  const resortId = req.params.resortId;

  const [results, metadata] = await sequelize.query(
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

  // return res.json(results);

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
  // const { review_description, review_rating, resort_id, user_id } = req.body;

  // await sequelize.query(
  //   "INSERT INTO reviews ( review_description, review_rating, resort_id, user_id) VALUES ( $review_description, $review_rating, $resort_id, $owner_id)",
  //   {
  //     bind: {
  //       review_description: review_description,
  //       review_rating: review_rating,
  //       resort_id: resort_id,
  //       user_id: user_id,
  //     },
  //   }
  // );

  // return res.status(200).json({
  //   message: "new review was created",
  // });
  return res.status(200).json({
    message: "createNewReview works",
  });
};
exports.deleteReviewById = async (req, res) => {
  return res.status(200).json({
    message: "deleteReviewById works",
  });
};
