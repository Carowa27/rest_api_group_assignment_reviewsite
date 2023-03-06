const { QueryTypes } = require("sequelize");
const { userRoles, listRoles } = require("../constants/user");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errorHandling");

exports.getReviewsFromResort = async (req, res) => {
  return res.status(200).json({
    message: "getReviewsFromResort works",
  });
};
exports.createNewReview = async (req, res) => {
  return res.status(200).json({
    message: "createNewReview works",
  });
};
exports.deleteReviewById = async (req, res) => {
  return res.status(200).json({
    message: "deleteReviewById works",
  });
};
