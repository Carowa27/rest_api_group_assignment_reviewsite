const { QueryTypes } = require("sequelize");
const { userRoles, listRoles } = require("../constants/users");
const { sequelize } = require("../database/config");
const { UnauthorizedError, NotFoundError } = require("../utils/errors");


exports.updateUserById = async (req, res) => {
    return res.status(200).json({
      message: "updateUserById works",
    });
  };
  exports.deleteUserById = async (req, res) => {
    return res.status(200).json({
      message: "deleteUserById works",
    });
  };
  exports.createUser = async (req, res) => {
    return res.status(200).json({
      message: "createUser works",
    });
  };
 ;