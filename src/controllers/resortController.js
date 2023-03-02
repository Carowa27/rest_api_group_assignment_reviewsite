const { QueryTypes } = require("sequelize");
const { userRoles, listRoles } = require("../constants/users");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");

exports.getAllResorts = async (req, res) => {
  return res.status(200).json({
    message: "getAllResorts works",
  });
};
exports.getResortById = async (req, res) => {
  return res.status(200).json({
    message: "getResortById works",
  });
};

exports.getAllResortsInCity = async (req, res) => {
  return res.status(200).json({
    message: "getAllResortsInCity works",
  });
};

exports.getReviewsFromResort = async (req, res) => {
  return res.status(200).json({
    message: "getReviewsFromResort works",
  });
};
exports.createNewResort = async (req, res) => {
  return res.status(200).json({
    message: "createNewResort + auth works",
  });
};

exports.updateResortById = async (req, res) => {
  return res.status(200).json({
    message: "updateResortById + auth works",
  });
};
exports.deleteResortById = async (req, res) => {
  return res.status(200).json({
    message: "deleteResortById + auth works",
  });
};
